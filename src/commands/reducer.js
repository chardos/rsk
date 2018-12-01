const createReducerFile = require('../createReducerFile');
const createActionFile = require('../createActionFile');
const createDuckFile = require('../createDuckFile');

const fs = require('fs');

module.exports = async (obj) => {
  const { config, command, positionalArgs, srcPath } = obj;
  const { style } = config;
  const [reducerName, ...actions] = positionalArgs;
  
  if (style === 'rails') {
    await createReducerFile({ srcPath, reducerName, actions });
    await createActionFile({ srcPath, reducerName, actions });
  }

  if (style === 'ducks') {
    await createDuckFile({ srcPath, reducerName, actions });
  }
}
