import BuildTree from '../BuildTree'

describe('BuildTree', () => {
  it('create instance BuildTree with name -> the instance should contain passed "name"', () => {
    const instanceBuildTree = new BuildTree('root')
    expect(instanceBuildTree.name).toBe('root')
  })

  it('create instance BuildTree and call createChildNode() -> field "children" should contain name with "deep_root_1" and empty children Map', () => {
    const instanceBuildTree = new BuildTree('root')
    instanceBuildTree.createChildNode('deep_root_1')
    expect(instanceBuildTree.children[0].name).toBe('deep_root_1')
  })

  it('create instance with several nodes by chaining -> each node should equal its own deep level', () => {
    const instance = new BuildTree('root')
    instance.createChildNode('deep_root_1').createChildNode('deep_root_2').createChildNode('deep_root_3')

    expect(instance.deep).toBe(1)
    expect(instance.children[0].deep).toBe(2)
    expect(instance.children[0].children[0].deep).toBe(3)
    expect(instance.children[0].children[0].children[0].deep).toBe(4)
  })

  it('create instance with several nodes by chaining and call print() -> should equal expected String', () => {
    const EXPECTED_STRING_TREE = '\nroot\n' +
        '└── deep_root_1\n' +
        '    └── deep_root_2\n' +
        '        └── deep_root_3\n'

    const instance = new BuildTree('root')
    instance.createChildNode('deep_root_1').createChildNode('deep_root_2').createChildNode('deep_root_3')

    expect(instance.print()).toEqual(EXPECTED_STRING_TREE)
  })

  it('create instance with several nodes like siblings and call print() -> should equal expected String', () => {
    const EXPECTED_STRING_TREE = '\nroot\n' +
        '├── deep_root_1\n' +
        '├── deep_root_2\n' +
        '└── deep_root_3\n'

    const instance = new BuildTree('root')
    instance.createChildNode('deep_root_1')
    instance.createChildNode('deep_root_2')
    instance.createChildNode('deep_root_3')

    expect(instance.print()).toEqual(EXPECTED_STRING_TREE)
  })
})
