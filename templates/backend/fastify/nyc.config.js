module.exports = function () {
  return `{
"report-dir": "./artifacts/coverage",
"include": "./src/**/*.spec.ts",
"exclude": ["__test__/"],
"extends": "@istanbuljs/nyc-config-typescript",
"all": true,
"check-coverage": true,
"branches": 80,
"functions": 80,
"lines": 80,
"statements": 80
}
`;
};
