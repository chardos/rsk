const createReducerFile = require('../helpers/createReducerFile');
const createActionFile = require('../helpers/createActionFile');
const createDuckFile = require('../helpers/createDuckFile');
// // const addToReducerIndex = require('../addToReducerIndex');

const fs = require('fs');

module.exports = async (obj) => {
  const { config, command, positionalArgs, srcPath } = obj;
  const { style } = config;
  const [reducerName, ...actions] = positionalArgs;
  
  if (style === 'rails') {
    await createReducerFile({ srcPath, reducerName, actions });
    await createActionFile({ srcPath, reducerName, actions });
    // TODO:
    // await addToReducerIndex({ srcPath, reducerName, actions });
  }

  if (style === 'ducks') {
    await createDuckFile({ srcPath, reducerName, actions });
  }
}
