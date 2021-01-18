#!/usr/bin/env node
const program = require('commander');
const { resolve } = require('path');
const epic = resolve(__dirname, '../lib/epic');

program
  .version('1.0.0')
  .command('create app', 'Creates an application', { executableFile: `${epic}-create.js` })
  .parse(process.argv);
