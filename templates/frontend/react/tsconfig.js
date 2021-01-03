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
    "allowJs": true,
    "checkJs": true,
    "strictPropertyInitialization": true,
    "alwaysStrict": true,
    "target": "es5",
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "skipLibCheck": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "declaration": true,
    "module": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "react",
    "allowSyntheticDefaultImports": true,
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