const { directories, packageJsonProperties, projectDependencies } = require('./fastifySetup');
const { fastifyFiles } = require('./fastifyFiles');

module.exports = {
  fastify: {
    directories,
    files: fastifyFiles,
    packageJsonProperties,
    projectDependencies,
  },
};


// module.exports = {

//   react:{
//     directories: fastifyDirectories,
//     packageScripts: {
//         scripts: {
//         build: 'npm run lint && npx tsc --build',
//         lint: 'npx tsc --noEmit && eslint "**/*.{js,ts}" --quiet --fix',
//         start: 'ts-node-dev ./index.ts',
//         test: 'ts-mocha && nyc mocha "**/*.{ts}',
//       },
//       ["lint-staged"]: {
//         ["*.css"]: [
//           "prettier --write",
//           "stylelint --fix",
//           "git add"
//         ],
//         "*.{ts,tsx}": [
//           "yarn run test:lint-staged",
//           "eslint --ext .ts,.tsx",
//           "prettier --write",
//           "git add"
//         ],
//         "*.{json,md}": [
//           "prettier --write",
//           "git add"
//         ]
//       },
//       husky: {
//         "hooks": {
//           "pre-commit": "lint-staged",
//           "pre-push": "test",
//           "precommit": "npm run inspect:all",       
//           "prepush": "npm run inspect:all"
//         }
//       }
//     }, 
//   }
// };

/**
 * jest config file
 */

// module.exports = {
//   rootDir: "src",
//   testMatch: ["**/__tests__/**/*.test.(ts|tsx|js|jsx)"],
//   verbose: false,
//   clearMocks: true,
//   resetModules: true,
//   coveragePathIgnorePatterns: [
//     "/node_modules/",
//     "/__fixtures__/",
//     "/__tests__/",
//     "/(__)?mock(s__)?/",
//     "/__jest__/",
//     ".?.min.js"
//   ],
//   moduleDirectories: ["node_modules", "src"],
//   transform: {
//     "^.+\\.(ts|tsx)$": "ts-jest"
//   },
//   moduleFileExtensions: ["js", "jsx", "json", "ts"]
// };
