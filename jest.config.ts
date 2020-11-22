/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.json");

export default {
  clearMocks: true,
  collectCoverageFrom: ["<rootDir>/src/app/**/*.ts"],
  coverageDirectory: "./src/__tests__/coverage",
  coverageProvider: "v8",
  coverageReporters: ["json", "lcov"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/",
  }),
  preset: "@shelf/jest-mongodb",
  testEnvironment: "node",
  testMatch: ["**/__tests__/integration/**/*.ts?(x)"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  verbose: true,
};
