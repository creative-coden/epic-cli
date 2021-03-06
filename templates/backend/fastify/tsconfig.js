module.exports = function(){
    return `{"$schema": "https://json.schemastore.org/tsconfig",
"display": "Node 14",

"extends": "@tsconfig/node14/tsconfig.json",  
"compilerOptions": {
  "lib": ["es2019", "es2020.promise", "es2020.bigint", "es2020.string"],
  "module": "commonjs",
  "target": "es2020",
  "types":["node", "webgl2"],
  "outDir": "dist",
  "strict": true,
  "strictNullChecks": true,
  "strictFunctionTypes": true,
  "strictBindCallApply": true,
  "strictPropertyInitialization": true,
  "resolveJsonModule": true,
  "esModuleInterop": true,
  "skipLibCheck": true,
  "forceConsistentCasingInFileNames": true,
  "noImplicitAny": true,
  "noImplicitThis": true,
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true,
  "sourceMap": true,
  "declaration": true
},  
"include": ["index.ts","server/**/*"],
"exclude": ["node_modules"]
}`
}