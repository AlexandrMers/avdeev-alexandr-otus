import minimist from 'minimist'

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

export default getArguments
