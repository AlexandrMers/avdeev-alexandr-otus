import path from 'path'
import { createReadStream, createWriteStream } from 'fs'

import { Transform, TransformCallback } from 'stream'

class StringTransformStream extends Transform {
  _lastPartOfLine: string | null = null
  _isNeedMore = 0

  _transform (chunk: any, encoding: string, callback: TransformCallback) {
    if (this._isNeedMore > 2) {
      return
    }

    let data = chunk.toString()
    if (this._lastPartOfLine) data = this._lastPartOfLine + data

    const lines = data.split('\n')

    // this._lastPartOfLine = lines.splice(lines.length - 1, 1)[0]
    // console.log('this._lastPartOfLine ->', this._lastPartOfLine)

    const linesToString = lines.join('\n')

    this.push(linesToString)
    callback()

    // this._isNeedMore++
  }

  // Данный метод сработает непосредственно перед закрытием потока (после выполнения последнего чанка)
  _flush (callback: TransformCallback) {
    this._lastPartOfLine = null
    console.log('run here flush')
    callback()
  }
}

const splitBigFileToSmallerFiles = (pathToFile: string, countFiles: number) => {
  const stream = new StringTransformStream({ encoding: 'utf-8', objectMode: true })
  const readStream = createReadStream(path.resolve(pathToFile), 'utf-8')

  // const writeStream = createWriteStream('./fileOutputExample.txt', 'utf-8')

  const pipedStream = readStream.pipe(stream).on('data', () => {})
}

const processRun = async () => {
  try {
    // const t1 = new Date().valueOf()

    // await createWriteStreamFunction('./fileExample.txt')
    splitBigFileToSmallerFiles('./fileExample.txt', 10)
    // const t2 = new Date().valueOf()
    // console.log((t2 - t1) / 1000 + 's')
  } catch (error) {
    console.error('error here ->', error)
  }
}
processRun()
