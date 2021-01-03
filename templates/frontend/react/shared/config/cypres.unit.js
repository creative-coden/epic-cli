module.exports = function () {
    return `{
  "pluginsFile": false,
  "fixturesFolder": false,
  "testFiles": "**/*.spec.tsx",
  "viewportWidth": 300,
  "viewportHeight": 300,
  "supportFile": "node_modules/cypress-react-unit-test/support",
  "experimentalComponentTesting": true,
  "componentFolder": "src/components"
}
`
};
