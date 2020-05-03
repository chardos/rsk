const createReducerFile = require('../helpers/createReducerFile');
const createActionFile = require('../helpers/createActionFile');
const createDuckFile = require('../helpers/createDuckFile');
const addToReducerIndex = require('../helpers/addToReducerIndex');

module.exports = async data => {
  const { config, positionalArgs, paths } = data;
  const { srcPath } = paths;
  const { combineActionsAndReducers, storeDirectory } = config;
  const [reducerName, ...actions] = positionalArgs;

  if (combineActionsAndReducers) {
    await createDuckFile({ srcPath, reducerName, config, actions });
  } else {
    await createReducerFile({ srcPath, reducerName, actions, storeDirectory });
    await createActionFile({ srcPath, reducerName, actions, storeDirectory });
  }

  await addToReducerIndex(data);
};
