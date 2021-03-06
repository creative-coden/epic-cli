exports.directories = [
  'shared/tooling',
  'shared/config',
  'cypress/fixtures',
  'cypress/integration/features',
  'cypress/integration/definitions',
  'cypress/plugins',
  'cypress/support',
  'src/components',
  'src/components/Home',
  'src/components/Greetings',
  'src/components/Helmet'
];

exports.packageJsonProperties = {
  runCommands: ['browserslist', 'cypress-cucumber-preprocessor', 'lint-staged', 'husky'],
  scripts: {
    "build": "webpack --progress --config ./shared/tooling/webpack.prod.js",
    "compile-schemas": "$(npm bin)/json2ts -i server/**/schemas/*.json -o ./types",
    "coverage": "$(npm bin)/nyc report --reporter=lcov --reporter=text",
    "dev": "webpack serve --progress --config ./shared/tooling/webpack.dev.js",
    "inspect:all": "concurrently -c \"bgBlue.bold,bgMagenta.bold,yellow\" \"npm:inspect:lint\" \"npm:inspect:updates\" \"npm:inspect:license\"",
    "inspect:license": "$(npm bin)/license-checker --production --json --out ./artifacts/license.json --failOn GPLv2",
    "inspect:lint": "$(npm bin)/eslint --ext .ts,.js --format table",
    "inspect:sanity-testing": "npm run test:runner -- --env grep=@sanity",
    "inspect:updates": "$(npm bin)/npm-check",
    "offline": "http-server dist",
    "pwa:assets": "$(npm bin)/pwa-asset-generator -i ./src/index.html -m ./src/manifest.webmanifest",
    "test:coverage": "npm run test:runner && npm run coverage",
    "test:e2e": "$(npm bin)/cypress open --config-file ./shared/config/cypress.json",
    "test:runner": "$(npm bin)/cypress run --config-file ./shared/config/cypress-unit.json",
    "test:unit": "$(npm bin)/cypress open --config-file ./shared/config/cypress-unit.json"
  },
  "browserslist": {
    "production": [
      ">= 0.5%",
      "not dead",
      "not op_mini all",
      "last 2 major versions",
      "Chrome >= 60",
      "Firefox >= 60",
      "not Edge < 79",
      "Firefox ESR",
      "iOS >= 10",
      "Safari >= 10",
      "Android >= 6",
      "not Explorer <= 11"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "cypress-cucumber-preprocessor": {
    "nonGlobalStepDefinitions": true
  },
  "lint-staged": {
    "*.css": [
      "npx prettier --write",
      "npx stylelint --fix"
    ],
    "*.{js,tsx,ts}": [
       "npm run lint",
       "npx prettier --write",
    ],
    "*.{json,md}": [
      "npx prettier --write"
    ],
  husky: {
    hooks: {
      'pre-commit': 'lint-staged',
      'pre-push': 'npm run inspect:all',
    },
  },
 }
};

exports.projectDependencies = {
  dependencies: ['react-bootstrap', 'react', 'react-dom', 'react-router-dom', 'react-router', 'react-helmet'],
  devDependencies: [
    'cypress',
    'cypress-audit',
    '@istanbuljs/nyc-config-typescript',
    'cypress-cucumber-preprocessor',
    '@cypress/webpack-preprocessor',
    'cypress-watch-and-reload',
    'cypress-react-unit-test',
    '@cypress/code-coverage',
    'imagemin-webp',
    'imagemin-webpack-plugin',
    'copy-webpack-plugin',
    'cypress-select-tests',
    'path-browserify',
    'pwa-asset-generator',
    'cross-env',
    'lint-staged ',
    'rimraf',
    'license-checker',
    'concurrently',
    '@babel/core',
    '@types/chai',
    '@types/mocha',
    '@types/react',
    '@types/cypress',
    '@types/react-dom',
    '@types/react-router-dom',
    '@types/react-helmet',
    '@typescript-eslint/parser',
    '@typescript-eslint/eslint-plugin',
    '@types/react-router',
    '@types/react-router-dom',
    '@types/cypress-cucumber-preprocessor',
    'babel-loader',
    'strip-ansi',
    'browser-sync',
    'clean-webpack-plugin',
    'concurrently',
    'cross-env',
    'css-loader',
    'css-modules-typescript-loader',
    'depcheck',
    'eslint',
    'eslint-config-prettier',
    'eslint-import-resolver-alias',
    'eslint-plugin-compat',
    'eslint-plugin-import',
    'eslint-plugin-prettier',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-security',
    'eslint-plugin-sonarjs',
    'eslint-plugin-chai-friendly',
    'eslint-plugin-cypress',
    'eslint-plugin-jsx-a11y',
    'html-webpack-plugin',
    'http-server',  
    'husky',
    'json-schema-to-typescript',
    'license-checker',
    'lint-staged',
    'nyc',
    'postcss-loader',
    'postcss-preset-env',
    'prettier',
    'source-map-support',
    'style-loader',
    'stylelint',
    'stylelint-config-css-modules',
    'stylelint-config-prettier',
    'stylelint-config-recommended',
    'stylelint-config-standard',
    'stylelint-order',
    'stylelint-prettier',
    'ts-loader',
    'type-fest',
    'typescript',
    'typescript-plugin-css-modules',
    'webpack',
    'webpack-bundle-analyzer',
    'webpack-cli',
    'webpack-dev-middleware',
    'webpack-dev-server',
    'webpack-manifest-plugin',
    'webpack-merge',
    'webpack-nano',
    'workbox-webpack-plugin',
    'depcheck',
    'npm-check',
  ],
};
