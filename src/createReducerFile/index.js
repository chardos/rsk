const fs = require('fs');
const prettier = require('prettier');
const makeDir = require('make-dir');
const generateReducerCode = require('./generateReducerCode');
const addActionsToReduxFile = require('../helpers/addActionsToReduxFile');

module.exports = async({ srcPath, reducerName, actions }) => {
  const reducersPath = `${srcPath}/reducers`;

  const path = await makeDir(reducersPath)
  const reducerPath = `${path}/${reducerName}.js`;
  let reducerCode;

  if (fs.existsSync(reducerPath)) {
    console.log(`reducers/${reducerName}.js exists.`)

    const existingFile = fs.readFileSync(reducerPath).toString();
    reducerCode = addActionsToReduxFile(reducerName, actions, existingFile);
  } else {
    reducerCode = generateReducerCode(reducerName, actions);
  }

  const prettifiedCode = prettier.format(reducerCode, { parser: 'babylon' });

  fs.writeFile(reducerPath, prettifiedCode, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
};
