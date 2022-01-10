import { TreeDataInterface } from '../printByStructure'
import path from 'path'
import fs from 'fs/promises'

export const getFoldersStructure = async (rootPath: string): Promise<TreeDataInterface[]> => {
  try {
    await fs.access(rootPath)

    async function recurseHandleDir (dirPath: string): Promise<TreeDataInterface[]> {
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
