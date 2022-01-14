
import { printTreeOfDirectory } from '../FoldersStructureUtils/printTreeOfDirectory'

describe('check render util with real file structure with "dirForTest"', () => {
  it('should render all file structure without "depth" param -> equal output structure', async () => {
    const printTree = await printTreeOfDirectory('./dirForTest')

    const OUTPUT_DIR = '\n' +
        'dirForTest\n' +
        '├── file5.txt\n' +
        '├── folder1\n' +
        '│  └── file1.txt\n' +
        '├── folder2\n' +
        '│  └── folder2-1\n' +
        '│      └── file2.txt\n' +
        '└── folder3\n' +
        '    └── file3.txt\n'

    expect(printTree).toBe(OUTPUT_DIR)
  })
  it('should render all file structure with "depth=1" -> equal output structure', async () => {
    const printTree = await printTreeOfDirectory('./dirForTest', 1)

    const OUTPUT_DIR = '\n' +
        'dirForTest\n' +
        '├── file5.txt\n' +
        '├── folder1\n' +
        '├── folder2\n' +
        '└── folder3\n'

    expect(printTree).toBe(OUTPUT_DIR)
  })

  it('should render all file structure with "depth=2" -> equal output structure', async () => {
    const printTree = await printTreeOfDirectory('./dirForTest', 2)

    const OUTPUT_DIR = '\n' +
        'dirForTest\n' +
        '├── file5.txt\n' +
        '├── folder1\n' +
        '│  └── file1.txt\n' +
        '├── folder2\n' +
        '│  └── folder2-1\n' +
        '└── folder3\n' +
        '    └── file3.txt\n'

    expect(printTree).toBe(OUTPUT_DIR)
  })
})
