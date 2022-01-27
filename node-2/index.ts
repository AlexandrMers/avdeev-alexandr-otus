import { splitBigFileToSmallerFiles } from './utils/splitBigFileToSmallerFiles'
import { createWriteStreamFunction } from './utils/createrFiles'

const processRun = async () => {
  try {
    // await createWriteStreamFunction('./fileExample.txt')
    const filesDir = await splitBigFileToSmallerFiles('./fileExample.txt', 10)
    console.log('filesDir -> ', filesDir)
  } catch (error) {
    console.error('error here ->', error)
  }
}
processRun()
