import fs, { createReadStream, WriteStream } from 'fs'
import path from 'path'
import { Transform, TransformCallback } from 'stream'
import { calculateProcess } from './calculateProcess'
import { createPathToFile } from './createPathToFile'

class StringTransformStream extends Transform {
  _lastPartOfLine: string | null = null;

  _transform (chunk: any, encoding: string, callback: TransformCallback) {
    let data = chunk.toString()

    // Если у нас есть обрезанная строка, тогда прибавляем к ней новый чанк (чтобы восстановить разорванное число)...
    if (this._lastPartOfLine) {
      data = this._lastPartOfLine + data
    }

    const lines = data.split('\n')
    // вырезаем последний элемент массива из чанка, так как он может быть "разорванным"
    this._lastPartOfLine = lines.splice(lines.length - 1, 1)[0]

    this.push(lines.join('\n'))
    callback()
  }

  // Данный метод сработает непосредственно перед закрытием потока (после выполнения последнего чанка)
  _flush (callback: TransformCallback) {
    this.push(this._lastPartOfLine)
    if (this._lastPartOfLine) {
      this.push(this._lastPartOfLine)
    }
    this._lastPartOfLine = null
    callback()
  }
}

const createOutWritableStream = (path: string) => {
  return fs.createWriteStream(path, 'utf-8')
}

const showProgress = (total: number, fileInfoSize : number) => {
  const loader = calculateProcess(total, fileInfoSize, 'Процесс разбиения файлов')
  process.stdout.write(`\r ${loader}`)
}

export const splitBigFileToSmallerFiles = async (pathToFile: string, countFiles: number): Promise<string[]> => {
  const transformStream = new StringTransformStream({
    encoding: 'utf-8',
    objectMode: true
  })

  const fileInfo = await fs.promises.stat(path.resolve(pathToFile))
  const maxSizeOneOfFile = Math.ceil(fileInfo.size / countFiles)

  return new Promise((resolve, reject) => {
    const readStream = createReadStream(path.resolve(pathToFile), 'utf-8')

    let orderFile = 1
    // Инициализируем первый поток...

    const pathForCurrentFile = createPathToFile('separatedFiles', orderFile)
    let currentWriteStream: WriteStream = createOutWritableStream(pathForCurrentFile)
    let currentFileSize = 0
    let totalSizeWritten = 0

    // Инициализируем список записанных файлов...
    const wriitenFiles: string[] = [pathForCurrentFile]

    const isLastWriteStream = orderFile === countFiles

    readStream.on('end', () => {
      console.log('\n Разбивка файлов произведена успешно')
      resolve(wriitenFiles)
    })

    readStream.on('error', () => {
      reject(new Error('Произошла ошибка чтения основного потока!'))
    })

    // 1. Начинаем читать общий поток файла
    readStream.pipe(transformStream).on('data', (data) => {
      totalSizeWritten += data.length
      // 2. Сработал чанк, нужно создать пишущий стрим и записывать в него чанки,
      // пока размер текущего файла не перевалит отметку "maxSizeOneOfFile". В случае если файл является последним
      // в нашем ограничении, тогда записываем в него весь остаток...
      if (currentFileSize <= maxSizeOneOfFile || isLastWriteStream) {
        currentWriteStream.write(data, () => {
          currentFileSize += data.length
          showProgress(totalSizeWritten, fileInfo.size)
        })
      } else {
        // Как только размер текущего файла достиг максимума
        // Завершаем текущий пишущий поток и создаем новый, с новым путем
        const generatedPath = createPathToFile('separatedFiles', ++orderFile)

        currentWriteStream.end(() => {
          wriitenFiles.push(generatedPath)
        })
        currentFileSize = 0
        // Создаём новый пишущий стрим с новым путем (changed orderFile)
        currentWriteStream = createOutWritableStream(generatedPath)
        currentWriteStream.write(data)
      }
    })
  })
}
