import { splitBigFileToSmallerFiles } from './utils/splitBigFileToSmallerFiles'

const processRun = async () => {
  try {
    // await createWriteStreamFunction('./fileExample.txt')
    await splitBigFileToSmallerFiles('./fileExample.txt', 1000)
  } catch (error) {
    console.error('error here ->', error)
  }
}
processRun()
