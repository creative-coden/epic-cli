module.exports = function(){
    return ` "report-dir": "./artifacts/coverage",
  "include": "./src/**/*.spec.tsx",
  "exclude": ["./cypress", "./shared", "./dist"],
  "extends": "@istanbuljs/nyc-config-typescript",
  "all": true,
  "check-coverage": true,
  "branches": 100,
  "functions": 100,
  "lines": 100,
  "statements": 100
}
`
}