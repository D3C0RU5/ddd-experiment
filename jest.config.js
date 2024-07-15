/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'babel',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
  },
}
