export default {
  preset: "ts-jest",
  moduleFileExtensions: ["js", "json", "ts"],
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  verbose: false,
  reporters: ["default"],
  coverageReporters: ["clover", "json", "cobertura"],
  coverageThreshold: {
    global: {
      branches: 25,
      functions: 25,
      lines: 25,
      statements: 25,
    },
  },
  collectCoverageFrom: [
    "!**/dist/**",
    // '!**/dtos/**',
    // '!**/decorators/**',
    "!**/models/**",
    "!**/configs/**",
    "!**/modules/**",
    "!**/schemas/**",
    "!**/validations/**",
    "!**/repositories/**",
    "!**/open-api/**",
    "!**/node_modules/**",
    "!src/main.ts",
    "!src/services/app.service.ts",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "identity-obj-proxy",
  },
  coverageDirectory: "<rootDir>/coverage",
  setupFilesAfterEnv: ["jest-extended/all"],
  moduleDirectories: ["node_modules"],
};
