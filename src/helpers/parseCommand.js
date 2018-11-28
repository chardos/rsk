const changeCase = require('change-case');
const createReducerFile = require('../createReducerFile');
const createActionFile = require('../createActionFile');
const createDuckFile = require('../createDuckFile');
const setupStore = require('../commands/setup-store');
const createComponentFile = require('../commands/sfc');
const cc = require('../commands/cc');
const { SFC, CC, REDUCER, SETUP_STORE } = require('../constants/commands');

const parseCommand = async (obj) => {
  // console.log(obj);
  const { config, command, positionalArgs, srcPath } = obj;
  const { style } = config;

  if (command === SFC) {
    const [componentName] = positionalArgs;
    const pascalCaseName = changeCase.pascalCase(componentName);

    await createComponentFile({
      ...obj,
      componentName: pascalCaseName,
    });
  }

  if (command === CC) {
    const [componentName] = positionalArgs;
    const pascalCaseName = changeCase.pascalCase(componentName);

    await createComponentFile({
      ...obj,
      componentName: pascalCaseName,
    });
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
