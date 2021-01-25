exports.directories = [
  '.circleci',
  'shared/tooling',
  'shared/config',
  'src/components',
  'src/components/Home',
  'src/components/Helmet',
  'tests/mocks',
  'tests/components',
];

exports.packageJsonProperties = {
  runCommands: ['browserslist', 'cypress-cucumber-preprocessor', 'husky', 'lint-staged'],
  scripts: {
    "build": "webpack --progress --config ./shared/tooling/webpack.prod.js",
    "compile-schemas": "$(npm bin)/json2ts -i server/**/schemas/*.json -o ./types",
    "inspect:all": "npm run inspect:updates && npm run inspect:license",
    "inspect:license": "$(npm bin)/license-checker --production --json --out ./artifacts/license.json --failOn GPLv2",
    "inspect:sanity-testing": "npm run test -- --env grep=@sanity",
    "inspect:updates": "$(npm bin)/ncu --doctor -u",
    "offline": "http-server dist",
    "pwa:assets": "$(npm bin)/pwa-asset-generator -i ./src/index.html -m ./src/manifest.webmanifest",
    "start": "webpack serve --progress --config ./shared/tooling/webpack.dev.js",
    "test": "$(npm bin)/jest --config ./shared/config/jest.config.json",
    "test:coverage": "$(npm bin)/jest --config ./shared/config/jest.config.json --coverage",
    "test:e2e:open": "$(npm bin)/cypress open --config-file ./shared/config/cypress.json",
    "test:features:all": "cypress run --config-file ./shared/config/cypress.json --spec \"**/*.features\""
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
    "nonGlobalStepDefinitions": true,
    "cucumberJson": {
      "generate": true,
      "outputFolder": "cypress/cucumber-json",
      "filePrefix": "",
      "fileSuffix": ".cucumber"
    }
  },
  "lint-staged": {
    "*.css": [
      "stylelint --fix"
    ],
    "*.{js,tsx,ts}": [
      "eslint '*/**/*.{js,ts,tsx}' --format table",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  },
 husky: {
  hooks: {
    'pre-commit': 'lint-staged',
    'pre-push': 'npm run inspect:all',
  },
},
};

exports.projectDependencies = {
  dependencies: ['react-bootstrap', 'react', 'react-dom', 'react-router-dom', 'react-router', 'react-helmet'],
  devDependencies: [
    'cypress',
    'cypress-audit',
    'cypress-cucumber-preprocessor',
    'multiple-cucumber-html-reporter',
    'imagemin-webp',
    'imagemin-webpack-plugin',
    'copy-webpack-plugin',
    'cypress-select-tests',
    'path-browserify',
    'pwa-asset-generator',
    '@testing-library/jest-dom',
    '@testing-library/react',
    '@types/jest',
    'jest',
    'jest-extended',
    'ts-jest',
    'lint-staged ',
    'rimraf',
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
    'strip-ansi',
    'browser-sync',
    'clean-webpack-plugin',
    'css-loader',
    'css-modules-typescript-loader',
    'eslint',
    'eslint-config-prettier',
    'eslint-import-resolver-alias',
    'eslint-plugin-compat',
    'eslint-plugin-import',
    'eslint-plugin-prettier',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-sonarjs',
    'eslint-plugin-cypress',
    'eslint-plugin-jsx-a11y',
    'html-webpack-plugin',
    'http-server',  
    'husky',
    'json-schema-to-typescript',
    'license-checker',
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
    'npm-check-updates',
  ],
};
