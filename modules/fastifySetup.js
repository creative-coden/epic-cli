exports.directories = [
  'server/config',
  'server/controller',
  'server/routes',
  'server/schemas',
  'server/types',
  'server/services',
  'server/__tests__/fixtures',
  'server/__tests__/integration',
  'server/__tests__/unit',
  'server/__tests__/support'
];

exports.packageJsonProperties = {
  runCommands: ['lint-staged', 'husky', 'types'],
  scripts: {
    build: 'npm run clean && npx tsc --build',
    clean: 'rimraf dist',
    "compile-schemas": "npx json2ts -i server/**/schemas/*.json -o ./types",
    coverage: 'npx nyc --reporter=lcov npm run test"',
    "dev": 'npx ts-node-dev ./index.ts',
    "inspect:all": "concurrently -c \"bgBlue.bold,bgMagenta.bold,yellow\" \"npm:inspect:lint\" \"npm:inspect:updates\" \"npm:inspect:license\"",   
    "inspect:license": "npx license-checker --production --json --out artifacts/license.json --failOn GPLv2",     
    "inspect:sanity-testing": 'npx ts-mocha && nyc mocha "**/*.{ts} --grep \"sanity\"',
    "inspect:updates": "npx npm-check-updates",
    lint: 'npx eslint --ext .ts,.js --format table',
    start: 'node ./index.js',
    test: 'npx ts-mocha && npx nyc mocha "**/*.{ts}',
  },
  ["lint-staged"]: {
    "*.{ts,js}": [
      "npm run lint",
      "npx prettier --write --ignore-unknown",
    ],
    "*.{json,md,yaml,yml}": [
      "npx prettier --write --ignore-unknown",
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
    'fastify-plugin',
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
    '@types/webgl2',
    'typescript',
    'ts-node-dev',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint-plugin-sonarjs',
    'eslint-plugin-security-node',
    'eslint-plugin-security',
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
    'npm-check-updates'
  ],
};
