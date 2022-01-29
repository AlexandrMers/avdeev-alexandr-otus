import fs from 'fs'
import path from 'path'
import { sortMergeFunc } from './sortWithMerging'
import { createPathToFile } from './createPathToFile'

export const sortSmallFiles = async (directories: string[]) => {
  for await (const fileResult of asyncPromiseGenerator(directories)) {
    console.log('-----iteration-----')
    console.log(fileResult)
    console.log('-----iteration-----')
  }
}

async function * asyncPromiseGenerator (directories: string[]) {
  let count = 1
  for (const url of directories) {
    const pathToFile = createPathToFile('sortedFiles', count++)

    const sortedFile = await fs.promises.readFile(url, { encoding: 'utf-8' })
    const arrayOfNumbers = sortedFile.split('\n')
    const sortedNumbers = sortMergeFunc(arrayOfNumbers)
    const joinedString = sortedNumbers.join('\n')

    yield await fs.promises.writeFile(path.resolve(pathToFile), joinedString, 'utf-8')
  }
}
