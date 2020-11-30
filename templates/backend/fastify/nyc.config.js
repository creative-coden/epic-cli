module.exports = function(){
    return `module.exports = {
  exclude: [
    'coverage',
    'self-coverage',
    '__test__/fixtures/coverage.js',
    '__test__/build/*',
    '__test__/src/*',
    '__test__/nyc.js',
    '__test__/process-args.js',
    '__test__/fixtures/_generateCoverage.js'
  ],
  branches: 100,
  functions: 100,
  lines: 100,
  statements: 100
}`
}