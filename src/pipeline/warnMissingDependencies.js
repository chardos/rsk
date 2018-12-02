const detectInstalled = require('detect-installed');
const logger = require('./logger');
const { REACT_COMMANDS, REDUX_COMMANDS } = require('../constants/commands');

const warnMissingDependencies = async (obj) => {
  const { command } = obj;
  const reactInstalled = await detectInstalled('react', {local: true});
  const reduxInstalled = await detectInstalled('redux', {local: true});

  if (REACT_COMMANDS.includes(command) && !reactInstalled) {
    logger.warn('Warning: React is not installed. Run `npm install -S react`.');
  }

  if (REDUX_COMMANDS.includes(command) && !reduxInstalled) {
    logger.warn('Warning: Redux is not installed. Run `npm install -S redux`.');
  }
  
  return obj;
};

module.exports = warnMissingDependencies;