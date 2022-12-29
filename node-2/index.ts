import { splitBigFileToSmallerFiles } from './utils/splitBigFileToSmallerFiles'
import { createWriteStreamFunction } from './utils/creatorFiles'
import { sortSmallFiles } from './utils/sortSmallFiles'

const processRun = async () => {
  try {
    await createWriteStreamFunction('./bigFile100mb.txt')
    const filesDir = await splitBigFileToSmallerFiles('./bigFile100mb.txt', 20)
    console.log('\n сортировка файлов ...')
    const sortedFiles = await sortSmallFiles(filesDir)
    console.log('\n сортировка прошла успешно ...')
    console.log('sortedFiles -> ', sortedFiles)
  } catch (error) {
    console.error('error here ->', error)
  }
}
processRun()
