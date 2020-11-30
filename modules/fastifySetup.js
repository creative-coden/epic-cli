exports.directories = [
  'server/config',
  'server/controller',
  'server/routes',
  'server/services',
  'server/__tests__/fixtures',
  'server/__tests__/integration',
  'server/__tests__/unit',
];

exports.packageJsonProperties = {
  runCommands: ['lint-staged', 'husky'],
  scripts: {
    build: 'npm run lint && npx tsc --build',
    coverage: 'nyc npm run test',
    "inspect:all": "concurrently -c \"bgBlue.bold,bgMagenta.bold,yellow\" \"npm:inspect:lint\" \"npm:inspect:vulnerabilities\" \"npm:inspect:license\"",   
    "inspect:license": "license-checker --failOn GPLv2",     
    "inspect:sanity-testing": 'ts-mocha && nyc mocha "**/*.{ts} --grep \"sanity\"',
    "inspect:vulnerabilities": "npm audit",
    lint: 'npx tsc --noEmit && eslint "**/*.{js,ts}" --quiet --fix',
    start: 'ts-node ./index.ts',
    "start:dev": 'ts-node-dev ./index.ts',
    test: 'ts-mocha && nyc mocha "**/*.{ts}',
  },
  ["lint-staged"]: {
    "*.{ts,tsx}": [
      "npm run inspect:sanity-testing",
      "eslint --ext .ts,.tsx",
      "prettier --write",
      "git add"
    ],
    "*.{json,md}": [
      "prettier --write",
      "git add"
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
  dependencies: [
    'fastify',
    'fastify-compress',
    'fastify-cors',
    'fastify-helmet',
    'fastify-multer',
    'fastify-healthcheck',
    '@sinclair/typebox',
    'source-map-support',
    'fastify-oas',
    'dotenv',
    'ts-node',
    'clinic',
  ],
  devDependencies: [
    'cross-env',
    'license-checker',
    'concurrently',
    '@types/multer',
    '@types/mocha',
    '@types/chai',
    'typescript',
    'ts-node-dev',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    '@tsconfig/node12',
    'source-map-support',
    'husky',
    'eslint',
    'prettier',
    'nyc',
  ],
};
