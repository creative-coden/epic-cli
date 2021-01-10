module.exports = function(){
    return `{
"compilerOptions": {
  "baseUrl": ".",
  "outDir": "dist",
  "strict": true,
  "forceConsistentCasingInFileNames": true,
  "moduleResolution": "node",
  "resolveJsonModule": true,
  "noImplicitAny": true,
  "noImplicitThis": true,
  "noImplicitReturns": true,
  "allowJs": true,
  "checkJs": true,
  "strictPropertyInitialization": true,
  "noUncheckedIndexedAccess": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "alwaysStrict": true,
  "target": "es5",
  "strictNullChecks": true,
  "strictFunctionTypes": true,
  "noFallthroughCasesInSwitch": true,
  "declarationMap": true,
  "strictBindCallApply": true,
  "skipLibCheck": true,
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true,
  "declaration": true,
  "module": "ES2020",
  "lib": ["WebWorker", "dom", "dom.iterable", "esnext"],
  "jsx": "react",
  "allowSyntheticDefaultImports": true,
  "allowUnreachableCode": false,
  "downlevelIteration": true,
  "importHelpers": true,
  "isolatedModules": true,
  "esModuleInterop": true,
  "sourceMap": true,
  "paths": {
    "@components/*": ["./src/components/*"],
    "@assets/*": ["./shared/assets/*"]
  }
},
"include": ["./src/**/*", "./cypress/**/*"],
"exclude": ["./dist", "node_modules"]
}
`
}