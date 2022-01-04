import { FAKE_DATA, printTreeByData } from '../printByStructure'

const FAKE_DATA_2 = {
  name: 'root',
  items: [
    {
      name: 'branch 1',
      items: [
        {
          name: 'level 1',
          items: [
            {
              name: 'file1.txt'
            },
            {
              name: 'file2.txt'
            }
          ]
        }
      ]
    },
    {
      name: 'branch 2',
      items: [
        {
          name: 'level 1',
          items: [
            {
              name: 'file1.txt'
            },
            {
              name: 'file2.txt'
            }
          ]
        }
      ]
    }
  ]
}

const FAKE_DATA_3 = {

  name: 'root',
  items: [
    {
      name: 'branch 1',
      items: [
        {
          name: 'level 1',
          items: [
            {
              name: 'file1.txt'
            },
            {
              name: 'file2.txt'
            }
          ]
        }
      ]
    },
    {
      name: 'branch 2',
      items: [
        {
          name: 'level 1',
          items: [
            {
              name: 'file1.txt'
            },
            {
              name: 'file2.txt'
            }
          ]
        }
      ]
    },
    {
      name: 'branch 3',
      items: [
        {
          name: 'level 1',
          items: [
            {
              name: 'file1.txt'
            },
            {
              name: 'level 2',
              items: [
                {
                  name: 'level 3',
                  items: [
                    {
                      name: 'level 4',
                      items: [
                        {
                          name: 'file1.txt'
                        },
                        {
                          name: 'file2.txt'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]

}

describe('check render tree structure', () => {
  it('check data structure variant 1', () => {
    const expectedStructure = '1\n' +
        '├── 2\n' +
        '│  ├── 3\n' +
        '│  └── 4\n' +
        '└── 5\n' +
        '    └── 6\n'

    expect(printTreeByData(FAKE_DATA)).toEqual(expectedStructure)
  })

  it('check data structure variant 2', () => {
    const expectedStructure = 'root\n' +
        '├── branch 1\n' +
        '│  └── level 1\n' +
        '│      ├── file1.txt\n' +
        '│      └── file2.txt\n' +
        '└── branch 2\n' +
        '    └── level 1\n' +
        '        ├── file1.txt\n' +
        '        └── file2.txt\n'

    expect(printTreeByData(FAKE_DATA_2)).toEqual(expectedStructure)
  })

  it('check data structure variant 3', () => {
    const expectedStructure = 'root\n' +
        '├── branch 1\n' +
        '│  └── level 1\n' +
        '│      ├── file1.txt\n' +
        '│      └── file2.txt\n' +
        '├── branch 2\n' +
        '│  └── level 1\n' +
        '│      ├── file1.txt\n' +
        '│      └── file2.txt\n' +
        '└── branch 3\n' +
        '    └── level 1\n' +
        '        ├── file1.txt\n' +
        '        └── level 2\n' +
        '            └── level 3\n' +
        '                └── level 4\n' +
        '                    ├── file1.txt\n' +
        '                    └── file2.txt\n'

    expect(printTreeByData(FAKE_DATA_3)).toEqual(expectedStructure)
  })
})
