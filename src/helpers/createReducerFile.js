const fs = require('fs');
const prettier = require('prettier');
const makeDir = require('make-dir');
const generateReducerCode = require('../renderers/redux/generateReducerCode');
const addActionsToReduxFile = require('../pipeline/addActionsToReduxFile');
const logger = require('../pipeline/logger');
const { lint } = require('../utils');

module.exports = async({ srcPath, reducerName, actions, storeDirectory }) => {
  const reducersPath = `${srcPath}/${storeDirectory}/${reducerName}`;

  const path = await makeDir(reducersPath)
  const reducerPath = `${reducersPath}/reducer.js`;
  let reducerCode;

  if (fs.existsSync(reducerPath)) {
    logger.success(`reducers/${reducerName}.js exists. Adding actions: ${actions.join(', ')}`)

    const existingFile = fs.readFileSync(reducerPath).toString();
    reducerCode = addActionsToReduxFile(reducerName, actions, existingFile);
  } else {
    logger.success(`Creating reducers/${reducerName}.js`)
    reducerCode = generateReducerCode(reducerName, actions);
  }

  const prettifiedCode = prettier.format(reducerCode, { parser: 'babylon' });

  lint(prettifiedCode);

  fs.writeFile(reducerPath, prettifiedCode, (err) => {
    if (err) console.error(`createReducerFile.js write error: ${err}`)
  });
};
