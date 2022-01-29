import fs, { writeFileSync } from 'fs'
import path from 'path'
import { sortMergeFunc } from './sortWithMerging'

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
    console.log('run here !!!')
    const sortedFile = fs.readFileSync(url, { encoding: 'utf-8' })
    const arrayOfNumbers = sortedFile.split('\n')
    const sortedNumbers = sortMergeFunc(arrayOfNumbers)
    const joinedString = sortedNumbers.join('\n')

    writeFileSync(path.resolve(`./sortedFiles/${count++}.txt`), joinedString, 'utf-8')
    yield
  }
}
