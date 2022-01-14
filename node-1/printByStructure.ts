import Tree from './BuildTree'

export interface TreeDataInterface {
    name: string | number;
    items?: TreeDataInterface[];
}

export const FAKE_STRUCTURE_DATA = {
  root: 1,
  items: [
    {
      name: 2,
      items: [
        {
          name: 3
        },
        {
          name: 4
        }
      ]
    },
    {
      name: 5,
      items: [
        {
          name: 6
        }
      ]
    }
  ]
}

export function printTreeByData (data: {
  root: string | number,
  items: TreeDataInterface[]
}, deep?: number) {
  const initialTree = new Tree(data.root)

  const buildTree = (tree = null, items: TreeDataInterface[] = []) => {
    if (tree?.deep > deep) {
      return
    }

    items.forEach(item => {
      const currentTree = tree.createChildNode(item.name)

      if (item?.items?.length) {
        buildTree(currentTree, item.items)
      }
    })
  }
  buildTree(initialTree, data.items)

  return initialTree.print()
}

console.log(printTreeByData(FAKE_STRUCTURE_DATA))
