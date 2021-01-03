module.exports = function(){
    return `{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "extends": [
    "plugin:chai-friendly/recommended",
    "plugin:compat/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "plugins": [
    "cypress",
    "chai-friendly",
    "import",
    "@typescript-eslint",
    "sonarjs",
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true
    }
  },
  "rules": {
    "cypress/no-assigning-return-values": "error",
    "cypress/no-unnecessary-waiting": "error",
    "cypress/assertion-before-screenshot": "warn",
    "cypress/no-force": "warn",
    "cypress/no-async-tests": "error",
    "no-unused-expressions": 0,
    "chai-friendly/no-unused-expressions": 2,
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/no-inferrable-types": [
      "warn",
      {
        "ignoreParameters": true
      }
    ],
    "@typescript-eslint/no-unused-vars": "warn",
    "sonarjs/cognitive-complexity": "error",
    "sonarjs/no-identical-expressions": "error",
    "sonarjs/no-collapsible-if": "error",
    "sonarjs/prefer-immediate-return": "error",
    "prettier/prettier": "error",
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "unknown"
        ],
        "newlines-between": "always"
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "alias": {
        "map": [
          ["@components", "./src/components"],
          ["@resources", "./src/resources"]
        ],
        "extensions": [".ts", ".tsx", ".json"]
      }
    }
  }
}    
`
}

