import Tree from './BuildTree'

export const FAKE_DATA = {
  name: 1,
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

interface TreeDataInterface {
    name: string | number;
    items?: TreeDataInterface[];
}

export function printTreeByData (data: TreeDataInterface): string {
  const initialTree = new Tree(data.name)

  const buildTree = (tree = null, items: TreeDataInterface[] = []) => {
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
