// eslint-disable-next-line unicorn/prefer-module
const {resolve} = require('node:path')
process.env.TS_NODE_PROJECT = resolve('test/tsconfig.json')
process.env.NODE_ENV = 'development'

global.oclif = global.oclif || {}
global.oclif.columns = 80
