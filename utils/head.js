// importing packages

const { bgRed } = require('chalk');
const io = require('console-read-write');
const pkg = require('../package.json');

module.exports = () =>
  io.write(bgRed(`\n ${pkg.name} v${pkg.version} by ${pkg.author.name}`));
