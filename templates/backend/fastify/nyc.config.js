module.exports = function(){
    return `{
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
"branches": 80,
"lines": 80,
"functions": 80,
"statements": 80
}`
}