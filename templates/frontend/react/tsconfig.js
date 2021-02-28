module.exports = function () {
  return `{
"compilerOptions": {
  "allowJs": true,
  "allowSyntheticDefaultImports": true,
  "alwaysStrict": true,
  "baseUrl": ".",
  "checkJs": true,
  "declaration": true,
  "declarationMap": true,
  "downlevelIteration": true,
  "emitDecoratorMetadata": true,
  "esModuleInterop": true,
  "experimentalDecorators": true,
  "forceConsistentCasingInFileNames": true,
  "importHelpers": true,
  "isolatedModules": true,
  "jsx": "react",
  "lib": ["WebWorker", "dom", "dom.iterable", "esnext"],
  "module": "ES2020",
  "moduleResolution": "node",
  "noImplicitAny": true,
  "noImplicitThis": true,
  "outDir": "dist",
  "paths": {
    "@components/*": ["./src/components/*"],
    "@assets/*": ["./shared/assets/*"]
  },
  "resolveJsonModule": true,
  "skipLibCheck": true,
  "sourceMap": true,
  "strict": true,
  "strictBindCallApply": true,
  "strictFunctionTypes": true,
  "strictNullChecks": true,
  "strictPropertyInitialization": true,
  "target": "es5"
},
"types": ["cypress"],
"include": ["./src/**/*", "./tests/**/*", "./cypress/**/*"],
"exclude": ["./dist", "node_modules"]
}
`;
};
