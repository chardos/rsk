const createReducerFile = require('../helpers/createReducerFile');
const createActionFile = require('../helpers/createActionFile');
const createDuckFile = require('../helpers/createDuckFile');
const addToReducerIndex = require('../helpers/addToReducerIndex');

const fs = require('fs');

module.exports = async (data) => {
  const { config, command, positionalArgs, srcPath, reducerExists } = data;
  const { style } = config;
  const [reducerName, ...actions] = positionalArgs;
  
  if (style === 'rails') {
    await createReducerFile({ srcPath, reducerName, actions });
    await createActionFile({ srcPath, reducerName, actions });
  }

  if (style === 'ducks') {
    await createDuckFile({ srcPath, reducerName, actions });
  }
  
  if (!reducerExists) {
    await addToReducerIndex(data);
  }
}
