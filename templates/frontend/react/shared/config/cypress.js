module.exports = function(){
    return `{
  "baseUrl": "http://localhost:9000",
  "testFiles": "**/*.{feature,features}",
  "pluginsFile": "cypress/plugins/index.js",
  "supportFile": "cypress/support/index.js",
  "experimentalComponentTesting": false,
  "viewportWidth": 1024,
  "viewportHeight": 800,
  "fixturesFolder": "cypress/fixtures",
  "ignoreTestFiles": "*.js"
}    
`
}