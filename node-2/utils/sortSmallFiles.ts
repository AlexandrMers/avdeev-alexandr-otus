import fs from 'fs'
import { createPathToFile } from './createPathToFile'

export const sortSmallFiles = async (directories: string[]) => {
  return sortSeparatedFiles(directories)
}

function sortSeparatedFiles (directories: string[]) {
  return directories.map((dir, order) => {
    const pathToFile = createPathToFile('sortedFiles', order + 1)

    const data = fs.readFileSync(dir)
      .toString()
      .split('\n')
      .map(Number)
      .sort((a, b) => a - b)
      .filter(num => !isNaN(num))
      .join('\n')

    fs.writeFileSync(pathToFile, data)

    return pathToFile
  })
}
