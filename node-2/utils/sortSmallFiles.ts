import fs from 'fs'
import { createPathToFile } from './createPathToFile'

// TODO - так было с асинхронным генератором...
// export const sortSmallFiles = async (directories: string[]) => {
//   for await (const fileResult of asyncPromiseGenerator(directories)) {
//     console.log('-----iteration-----')
//     console.log(fileResult)
//     console.log('-----iteration-----')
//   }
// }
//
// async function * asyncPromiseGenerator (directories: string[]) {
//   let count = 1
//   for (const url of directories) {
//     const pathToFile = createPathToFile('sortedFiles', count++)
//
//     const sortedFile = await fs.promises.readFile(url, { encoding: 'utf-8' })
//     const arrayOfNumbers = sortedFile.split('\n')
//   TODO - здесь какая то косячная реализация алгоритма сортировки слиянием, заметил, что стандартный метод сортировки работает гораздо быстрее :(
//     const sortedNumbers = sortMergeFunc(arrayOfNumbers)
//     const joinedString = sortedNumbers.join('\n')
//
//     yield await fs.promises.writeFile(path.resolve(pathToFile), joinedString, 'utf-8')
//   }
// }

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
