module.exports = function () {
  return `{
  "rootDir": "../../",
  "verbose": true,
  "transform": {
    "^.+\\\\.tsx?$": "ts-jest"
  },
  "testMatch": [
    "<rootDir>/tests/components/**/*.[jt]s?(x)",
    "<rootDir>/?(*.)+(spec|test).[jt]s?(x)"
  ],
  "setupFilesAfterEnv": ["@testing-library/jest-dom", "@testing-library/react-hooks", "jest-extended"],
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx"],
  "coverageDirectory": "<rootDir>/artifacts/tests/coverage",
  "moduleDirectories": ["node_modules"],
  "moduleNameMapper": {
    "\\\\.css$": "<rootDir>/tests/mocks/styleMock.js",
    "@components/(.*)$": "<rootDir>/src/components/$1",
    "@assets/(.*)$": "<rootDir>/shared/assets/$1"
  },
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": -10
    }
  },
  "coveragePathIgnorePatterns": [
    "<rootDir>/artifacts/tests/coverage",
    "<rootDir>/tests/mocks"
  ],
  "globals": {
    "test-jest": {
      "diagnostics": false
    }
  }
}  
  `
};
