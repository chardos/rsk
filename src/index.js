const minimist = require('minimist');
const findUp = require('find-up');
const getConfig = require('./pipeline/getConfig');
const decorateData = require('./pipeline/decorateData');
const parseCommand = require('./pipeline/parseCommand');
const warnMissingDependencies = require('./pipeline/warnMissingDependencies');
const runValidations = require('./pipeline/runValidations');
const logger = require('./pipeline/logger');


const CONFIG_FILE_NAME = '.rsk.js';

module.exports = async () => {
  const args = minimist(process.argv.slice(2));
  const { 
    _: commands,
    ...options
  } = args;
  const [command, ...positionalArgs] = commands;

  return await findUp(CONFIG_FILE_NAME)
    .then(configPath => ({ configPath, command, positionalArgs, options }))
    .then(warnMissingDependencies)
    .then(getConfig)
    .then(runValidations)
    .then(decorateData)
    .then(parseCommand)
    .catch(logger.error);
};
