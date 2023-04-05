/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

const ROOT_DIR = './';
const SRC_PATH = '<rootDir>/src';
const MOCK_PATH = '<rootDir>/config/__mock__';
const TS_CONFIG_PATH = './tsconfig.json';

module.exports = {
  testEnvironment: 'jsdom',
  rootDir: ROOT_DIR,
  roots: [SRC_PATH],
  testMatch: [
    '<rootDir>/src/**/*.(test).{js,jsx,ts,tsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
  ],
  // the following line is needed in order to grab modules from the
  // src folder without the need to write them relatively
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: [
    '**/*.{ts,tsx,scss,css}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `${MOCK_PATH}/fileTransformer.js`,
    '\\.svg': `${MOCK_PATH}/svgrMock.js`,
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },
  globals: {
    'ts-jest': {
      tsconfig: TS_CONFIG_PATH,
    },
    window: {},
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/tests/mockSetup.ts',
    '@testing-library/jest-dom',
  ],
};
