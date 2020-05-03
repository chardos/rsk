const createReducerFile = require('../helpers/createReducerFile');
const createActionFile = require('../helpers/createActionFile');
const createDuckFile = require('../helpers/createDuckFile');
const addToReducerIndex = require('../helpers/addToReducerIndex');

const fs = require('fs');

module.exports = async (data) => {
  const { config, positionalArgs, paths } = data;
  const  { srcPath} = paths;
  const { style, storeDirectory } = config;
  const [reducerName, ...actions] = positionalArgs;
  
  if (style === 'rails') {
    await createReducerFile({ srcPath, reducerName, actions, storeDirectory });
    await createActionFile({ srcPath, reducerName, actions, storeDirectory });
  }

  if (style === 'ducks') {
    await createDuckFile({ srcPath, reducerName, config, actions });
  }
  
  await addToReducerIndex(data);
}
