const detectInstalled = require('detect-installed');
const logger = require('./logger');
const { REACT_COMMANDS, REDUX_COMMANDS } = require('../constants/commands');

const warnMissingDependencies = async (data) => {
  // return early if debug mode
  if (process.env.DEBUG) { return data };
  
  const { command } = data;
  const reactInstalled = await detectInstalled('react', {local: true});
  const reduxInstalled = await detectInstalled('redux', {local: true});

  if (REACT_COMMANDS.includes(command) && !reactInstalled) {
    logger.warn('Warning: React is not installed. Run `npm install -S react`.');
  }

  if (REDUX_COMMANDS.includes(command) && !reduxInstalled) {
    logger.warn('Warning: Redux is not installed. Run `npm install -S redux`.');
  }
  
  return data;
};

module.exports = warnMissingDependencies;
