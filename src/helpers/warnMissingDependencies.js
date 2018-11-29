const detectInstalled = require('detect-installed');
const logger = require('./logger');
const { SETUP_STORE } = require('../constants/commands');

const warnMissingDependencies = async (obj) => {
  console.log('obj', obj);
  const { command } = obj;
  const reduxInstalled = await detectInstalled('redux', {local: true});

  if (command === SETUP_STORE && !reduxInstalled) {
    logger.warn('Warning: Redux is not installed. Run `npm install -S redux`.');
  }
  
  return obj;
};

module.exports = warnMissingDependencies;
