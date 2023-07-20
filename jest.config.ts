/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTest.ts'],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/components/**/*.ts?(x)', '!src/**/*.stories.ts?(x)',],
  coveragePathIgnorePatterns: ['/node_modules/', '/lib/', '/coverage/'],
}