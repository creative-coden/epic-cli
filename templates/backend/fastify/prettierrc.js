module.exports = function(){
    return `{
  "arrowParens": "avoid",
  "bracketSpacing": true,
  "endOfLine": "lf",
  "htmlWhitespaceSensitivity": "css",
  "jsxBracketSameLine": false,
  "printWidth": 125,
  "requirePragma": false,
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false,
  "overrides": [
    {
      "files": "*.json",
      "options": {
        "printWidth": 150
      }
    }
  ]
}`
}

