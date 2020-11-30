module.exports = function(){
    return `{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Node 12",
 
  "compilerOptions": {
    "lib": ["es2019", "es2020.promise", "es2020.bigint", "es2020.string"],
    "module": "commonjs",
    "target": "es2020",
 
    "outDir": "dist",
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "sourceMap": true,
    "declaration": true
  },
  "include": ["index.ts","server/**/*"],
  "exclude": ["node_modules"]    
}`
}