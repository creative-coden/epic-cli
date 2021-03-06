module.exports = function(){
    return `{
  "arrowParens": "avoid",
  "bracketSpacing": true,
  "endOfLine": "lf",
  "printWidth": 125,
  "requirePragma": false,
  "semi": true,
  "singleQuote": true,
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

