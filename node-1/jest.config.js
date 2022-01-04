module.exports = {
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: [
    '**/tests/**.test.+(ts|js)'
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!node-formatter)'
  ],
  moduleNameMapper: {
    'node-formatter': '<rootDir>/node_modules/node-formatter'
  }
}
