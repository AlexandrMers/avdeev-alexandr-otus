import { printTreeByData } from '../printByStructure'
import { getFoldersStructure } from './getFoldersStructure'

export const printTreeOfDirectory = async (directory: string, depth?: number) => {
  const splittedPath = directory.split('/').filter(Boolean)
  const rootDirectory = splittedPath[splittedPath.length - 1]
  const filesStructure = await getFoldersStructure(directory)

  const directoryFromRoot = { root: rootDirectory, items: filesStructure }
  return printTreeByData(directoryFromRoot, depth)
}
