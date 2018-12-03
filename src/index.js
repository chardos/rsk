const minimist = require('minimist');
const findUp = require('find-up');
const getConfig = require('./pipeline/getConfig');
const decorateData = require('./pipeline/decorateData');
const parseCommand = require('./pipeline/parseCommand');
const warnMissingDependencies = require('./pipeline/warnMissingDependencies');
const runValidations = require('./pipeline/runValidations');
const logger = require('./pipeline/logger');
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
    .then(runValidations)
    .then(decorateData)
    .then(parseCommand)
    .catch(logger.error);
};
