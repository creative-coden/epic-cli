module.exports = function(){
    return `{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "sonarjs", "prettier"],
  "extends": ["plugin:@typescript-eslint/recommended"],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/no-inferrable-types": [
      "warn", {
        "ignoreParameters": true
      }
    ],
    "@typescript-eslint/no-unused-vars": "warn",
    "sonarjs/cognitive-complexity": "error",
    "sonarjs/no-identical-expressions": "error",
    "sonarjs/no-collapsible-if": "error",
    "sonarjs/prefer-immediate-return": "error",
    "prettier/prettier": "error"
  }
}`
}

