import { splitBigFileToSmallerFiles } from './utils/splitBigFileToSmallerFiles'
import { createWriteStreamFunction } from './utils/creatorFiles'
import { sortSmallFiles } from './utils/sortSmallFiles'

const processRun = async () => {
  try {
    await createWriteStreamFunction('./fileExample.txt')
    const filesDir = await splitBigFileToSmallerFiles('./fileExample.txt', 15)
    const sortedFiles = await sortSmallFiles(filesDir)
    console.log('sortedFiles -> ', sortedFiles)
  } catch (error) {
    console.error('error here ->', error)
  }
}
processRun()
