exports.directories = [
  'server/config',
  'server/controller',
  'server/controller/schemas',
  'server/controller/types',
  'server/routes',
  'server/services',
  'server/__tests__/fixtures',
  'server/__tests__/integration',
  'server/__tests__/unit',
  'server/__tests__/support'
];

exports.packageJsonProperties = {
  runCommands: ['lint-staged', 'husky', 'types'],
  scripts: {
    build: 'npm run lint && npm run clean && npx tsc --build',
    clean: 'rimraf dist',
    "compile-schemas": "json2ts -i server/**/*.json -o build",
    coverage: 'npx nyc --reporter=lcov npm run test"',
    "dev": 'ts-node-dev ./index.ts',
    "inspect:all": "concurrently -c \"bgBlue.bold,bgMagenta.bold,yellow\" \"npm:inspect:lint\" \"npm:inspect:vulnerabilities\" \"npm:inspect:license\"",   
    "inspect:license": "license-checker --failOn GPLv2",     
    "inspect:sanity-testing": 'ts-mocha && nyc mocha "**/*.{ts} --grep \"sanity\"',
    "inspect:vulnerabilities": "npm audit",
    lint: 'npx tsc --noEmit && eslint "**/*.{js,ts}" --quiet --fix',
    start: 'node ./index.js',
    test: 'ts-mocha && npx nyc mocha "**/*.{ts}',
  },
  ["lint-staged"]: {
    "*.{ts,tsx}": [
      "npm run inspect:sanity-testing",
      "npx eslint --ext .ts,.tsx",
      "npx prettier --write",
    ],
    "*.{json,md}": [
      "npx prettier --write",
    ]
  },
  husky: {
    hooks: {
      'pre-commit': 'lint-staged',
      'pre-push': 'npm run inspect:all',
    },
  },
  "types": "index.d.ts",
};

exports.projectDependencies = {
  dependencies: [
    'fastify',
    'fastify-compress',
    'fastify-cors',
    'fastify-helmet',
    'fastify-multer',
    'fastify-healthcheck',
    'fastify-formbody',
    'source-map-support',
    'fastify-oas',
    '@wwa/fastify-favicon',
    'dotenv',
    'ts-node',
    'clinic',
  ],
  devDependencies: [
    'cross-env',
    'lint-staged ',
    'rimraf',
    'license-checker',
    'concurrently',
    '@types/multer',
    '@types/mocha',
    '@types/chai',
    '@types/node',
    'typescript',
    'ts-node-dev',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint-plugin-sonarjs',
    'eslint',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    '@tsconfig/node14',
    'json-schema-to-typescript',
    'source-map-support',
    'husky',
    'prettier',
    'nyc',
    'depcheck',
    'npm-check'
  ],
};
