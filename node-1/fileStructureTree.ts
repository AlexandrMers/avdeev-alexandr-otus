import path from 'path'

import getArguments from './FoldersStructureUtils/getArgs'

import { printTreeOfDirectory } from './FoldersStructureUtils/printTreeOfDirectory'

export const runTreeFileStructure = async () => {
  const { _: args, depth } = getArguments()
  const result = await printTreeOfDirectory(path.resolve(args[0]), depth)
  console.log(result)
}
runTreeFileStructure()
