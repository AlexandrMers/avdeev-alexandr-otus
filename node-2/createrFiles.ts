import fs from 'fs'

const FILE_SIZE = 1024 * 1024 * 100

// function calculateUseMemory () {
//   const COUNT_BYTES = 1024
//   return process.memoryUsage().heapUsed / COUNT_BYTES / COUNT_BYTES
// }
//
// function calculateUsedMemoryInMb (memory: number) {
//   return Math.round(memory * 100) / 100
// }

function randomInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const threatOfWriteFile = fs.createWriteStream('./fileExample.txt', {
  encoding: 'utf-8'
})

function calculateProcess (start: number, end: number): string {
  const calculatedProgress = Math.ceil((start / end) * 100)

  return `Процесс создания файла - ${calculatedProgress > 100 ? 100 : calculatedProgress}%`
}

const createFile = () => {
  if (threatOfWriteFile.bytesWritten > FILE_SIZE) {
    threatOfWriteFile.end(() => {
      process.stdout.write('\r\n\n')
      console.log('Файл успешно записан...')
    })
    return
  }

  // Делаем порцию из 100 случайных чисел...
  const STRING_WITH_RANDOM_NUMBERS = Array.from({ length: 100 },
    () => randomInteger(0, 100000)
  ).join(' ')

  threatOfWriteFile.write(`${STRING_WITH_RANDOM_NUMBERS} `, (error) => {
    if (error) {
      threatOfWriteFile.end()
      console.log('Произошла ошибка записи потока')
    }

    const progressText = calculateProcess(threatOfWriteFile.bytesWritten, FILE_SIZE)
    process.stdout.write(`\r ${progressText}`)

    // Чанк записался и мы снова вызываем в рекурсию для записи нового чанка...
    createFile()
  })
}
createFile()
