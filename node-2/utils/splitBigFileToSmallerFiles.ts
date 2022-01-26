import fs, { createReadStream, WriteStream } from 'fs'
import path from 'path'
import { Transform, TransformCallback } from 'stream'
import { calculateProcess } from './createrFiles'

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

    lines.forEach(line => {
      this.push(line + '\n')
    })
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

const createOutWritableStream = (part: number) => {
  return fs.createWriteStream(path.resolve(`./smallFiles/${part}.txt`), 'utf-8')
}

export const splitBigFileToSmallerFiles = async (pathToFile: string, countFiles: number) => {
  const stream = new StringTransformStream({
    encoding: 'utf-8',
    objectMode: true
  })

  const fileInfo = await fs.promises.stat(path.resolve(pathToFile))

  const maxSizeOneOfFile = Math.ceil(fileInfo.size / countFiles)

  const readStream = createReadStream(path.resolve(pathToFile), 'utf-8')

  let orderFile = 1
  let currentWriteStream: WriteStream = createOutWritableStream(orderFile)
  let currentFileSize = 0
  let totalSizeWritten = 0

  // 1. Начинаем читать общий поток файла
  readStream.pipe(stream).on('data', (data) => {
    totalSizeWritten += data.length

    // 2. Сработал чанк, нужно создать пишущий стрим и записывать в него чанки,
    // пока размер текущего файла не перевалит отметку "maxSizeOneOfFile"
    if (currentFileSize <= maxSizeOneOfFile) {
      currentWriteStream.write(data, () => {
        currentFileSize += data.length

        const loader = calculateProcess(totalSizeWritten, fileInfo.size, 'Процесс разбиения файлов')
        process.stdout.write(`\r ${loader}`)
      })
    } else {
      // Как только размер текущего файла достиг максимума
      // Завершаем текущий пишущий поток и создаем новый, с новым путем
      currentWriteStream.end()
      currentFileSize = 0
      // Создаём новый пишущий стрим с новым путем (changed orderFile)
      currentWriteStream = createOutWritableStream(++orderFile)
      currentWriteStream.write(data)
    }
  })
}
