const changeCase = require('change-case');
const createReducerFile = require('../createReducerFile');
const createActionFile = require('../createActionFile');
const createDuckFile = require('../createDuckFile');
const setupStore = require('../commands/setup-store');
const sfc = require('../commands/sfc');
const cc = require('../commands/cc');
const { SFC, CC, REDUCER, SETUP_STORE } = require('../constants/commands');

const parseCommand = async (obj) => {
  const { config, command, positionalArgs, srcPath } = obj;
  const { style } = config;

  if (command === SFC) {
    await sfc(obj);
  }

  if (command === CC) {
    await cc(obj);
  }

  if (command === SETUP_STORE) {
    setupStore(obj)
  }

  if (command === REDUCER) {
    const [reducerName, ...actions] = positionalArgs;
    if (style === 'rails') {
      await createReducerFile({ srcPath, reducerName, actions });
      await createActionFile({ srcPath, reducerName, actions });
    }

    if (style === 'ducks') {
      await createDuckFile({ srcPath, reducerName, actions });
    }
  }
};

module.exports = parseCommand;
