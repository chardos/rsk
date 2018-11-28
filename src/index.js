const minimist = require('minimist');
const findUp = require('find-up');
const getConfig = require('./helpers/getConfig');
const parseCommand = require('./helpers/parseCommand');
const runValidations = require('./helpers/runValidations');
const logger = require('./helpers/logger');
const { COMMANDS } = require('./constants/commands');

const CONFIG_FILE_NAME = '.rsk';

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  const commands = args._;
  const [command, ...positionalArgs] = commands;
  if (!COMMANDS.includes(command)) {
    throw new Error(`${command} is not a valid command.`);
  }

  findUp(CONFIG_FILE_NAME)
    .then(path => ({ path, command, positionalArgs }))
    .then(getConfig)
    .then(runValidations)
    .then(parseCommand)
    .catch(logger.error);

  // TODO: find the file with combine reducers in it
  // use https://www.npmjs.com/package/find-in-files
};
