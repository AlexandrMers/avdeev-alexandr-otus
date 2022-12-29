import fs from 'fs'
import path from 'path'

export const createPathToFile = (directory: string, orderFile: number) => {
  const isExistDir = fs.existsSync(path.resolve(`./${directory}`))

  if (!isExistDir) {
    fs.mkdirSync(path.resolve(`./${directory}`))
  }

  return path.resolve(`./${directory}/${orderFile}.txt`)
}
