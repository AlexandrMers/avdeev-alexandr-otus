import fs from 'fs'
import path from 'path'

const FILE_SIZE = 1024 * 1024 * 100

function randomInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function calculateProcess (start: number, end: number, prependText: string): string {
  const calculatedProgress = Math.ceil((start / end) * 100)

  return `${prependText} - ${calculatedProgress > 100 ? 100 : calculatedProgress}%`
}

export const createWriteStreamFunction = async (pathToFile: string): Promise<boolean> => {
  const threatOfWriteFile = fs.createWriteStream(path.resolve(pathToFile), {
    encoding: 'utf-8'
  })

  return new Promise((resolve, reject) => {
    const writeFile = () => {
      if (threatOfWriteFile.bytesWritten >= FILE_SIZE) {
        threatOfWriteFile.end(() => {
          process.stdout.write('\r\n\n')
          console.log('Файл успешно записан...')
          resolve(true)
        })
        return
      }

      // Делаем порцию из 100 случайных чисел...
      const STRING_WITH_RANDOM_NUMBERS = Array.from({ length: 300 },
        () => randomInteger(0, 100000)
      ).join('\n')

      threatOfWriteFile.write(`${STRING_WITH_RANDOM_NUMBERS}\n`, (error) => {
        if (error) {
          const ERROR = 'Произошла ошибка записи потока'

          threatOfWriteFile.end()
          console.log(ERROR)
          reject(ERROR)
        }

        // Показываем прогресс создания файла
        const progressText = calculateProcess(threatOfWriteFile.bytesWritten, FILE_SIZE, 'Процесс создания файла')
        process.stdout.write(`\r ${progressText}`)

        // Чанк записался и мы снова вызываем в рекурсию для записи нового чанка...
        writeFile()
      })
    }
    writeFile()
  })
}
