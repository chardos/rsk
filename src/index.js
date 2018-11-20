const minimist = require('minimist');
const fs = require('fs');
const makeDir = require('make-dir');
const createReducerFile = require('./createReducerFile');
const createActionFile = require('./createActionFile');

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  const commands = args._;
  const [reducerName, ...actions] = commands;

  createReducerFile(reducerName, actions);
  createActionFile(reducerName, actions);

  // TODO: find the file with combine reducers in it
  // use https://www.npmjs.com/package/find-in-files
}