enum SEPARATORS {
    LINE = '──',
    DOUBLE_SPACE = '  ',
    SIBILING_DIR_PARENT = '│',
    WITHOUT_SIBILING = '└',
    WITH_SIBILING = '├'
}

const generateRandomId = () => Math.floor(Math.random() * Date.now())

class Tree {
    private _children = new Map();
    private id = generateRandomId()
    name: string | number
    private _deep: number = 1

    constructor (name: string | number) {
      this.name = name
    }

    get deep () {
      return this._deep
    }

    set deep (val) {
      this._deep = val
    }

    get identifier () {
      return this.id
    }

    get children (): Tree[] {
      return Array.from(this._children.values())
    }

    createChildNode (name: string | number) {
      const newNode = new Tree(name)
      this._children.set(newNode.identifier, newNode)
      newNode.deep = this.deep + 1

      return newNode
    }

    setPreSymbol (isExistNextSibiling: boolean, parentSymbol = '') {
      return `${parentSymbol}${isExistNextSibiling ? SEPARATORS.WITH_SIBILING : SEPARATORS.WITHOUT_SIBILING}${SEPARATORS.LINE} `
    }

    getTreeString (node: Tree, parentSeparator = '') {
      return node.children.reduce((str, child, index, array) => {
        const isExistSibiling = Boolean(array[index + 1])

        str += `${this.setPreSymbol(isExistSibiling, parentSeparator)}${child.name}\n`

        if (child.children.length) {
          const parentSeparatorSymbol = `${parentSeparator}${isExistSibiling ? SEPARATORS.SIBILING_DIR_PARENT : SEPARATORS.DOUBLE_SPACE}` + SEPARATORS.DOUBLE_SPACE

          str += this.getTreeString(child, parentSeparatorSymbol)
        }

        return str
      }, '')
    }

    print () {
      return `\n${this.name}\n${this.getTreeString(this)}`
    }
}

export default Tree
