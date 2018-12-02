const minimist = require('minimist');
const findUp = require('find-up');
const getConfig = require('./helpers/getConfig');
const decorateData = require('./helpers/decorateData');
const parseCommand = require('./helpers/parseCommand');
const warnMissingDependencies = require('./helpers/warnMissingDependencies');
const runValidations = require('./helpers/runValidations');
const logger = require('./helpers/logger');
const { COMMANDS } = require('./constants/commands');

const CONFIG_FILE_NAME = '.rsk';

module.exports = async () => {
  const args = minimist(process.argv.slice(2));
  const commands = args._;
  const [command, ...positionalArgs] = commands;
  if (!COMMANDS.includes(command)) {
    throw new Error(`${command} is not a valid command.`);
  }

  return await findUp(CONFIG_FILE_NAME)
    .then(path => ({ path, command, positionalArgs }))
    .then(warnMissingDependencies)
    .then(getConfig)
    .then(decorateData)
    .then(runValidations)
    .then(parseCommand)
    .catch(logger.error);
};
