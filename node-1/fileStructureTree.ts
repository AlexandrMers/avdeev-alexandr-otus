import minimist from 'minimist'
import fs from 'fs/promises'
import path from 'path'

import { printTreeByData, TreeDataInterface } from './printByStructure'

function getArguments (): {
  depth: number,
  _: [string]
  } {
  return minimist(process.argv.slice(2), {
    alias: {
      d: 'depth'
    }
  })
}

// TODO - написать юнит тесты на тестовую директорию с учетом глубины вложенности.

const getFoldersStructure = async (rootPath: string): Promise<TreeDataInterface[]> => {
  try {
    await fs.access(rootPath)

    async function recurseHandleDir (dirPath: string): Promise<any> {
      const currentDir = await fs.readdir(path.resolve(dirPath), { withFileTypes: true })

      return Promise.all([...currentDir.map(async dir => ({
        name: dir.name,
        items: dir.isDirectory() ? await recurseHandleDir(`${dirPath}/${dir.name}`) : null
      }))])
    }
    return recurseHandleDir(rootPath)
  } catch (e) {
    throw Error('Such a directory is not existed')
  }
}

const printTreeOfDirectory = async () => {
  const { _: args, depth } = getArguments()

  const directoryPath = args[0]

  const splittedPath = directoryPath.split('/').filter(Boolean)
  const rootDirectory = splittedPath[splittedPath.length - 1]
  const filesStructure = await getFoldersStructure(directoryPath)

  const directoryFromRoot = { root: rootDirectory, items: filesStructure }
  const data = printTreeByData(directoryFromRoot, depth)
  console.log('data -> ', data)
}

printTreeOfDirectory()
