const fs = require('fs');
const prettier = require('prettier');
const makeDir = require('make-dir');
const generateReducerCode = require('./generateReducerCode');
const modifyExistingReduxFile = require('../helpers/modifyExistingReduxFile');

module.exports = ({ srcPath, reducerName, actions }) => {
  const reducersPath = `${srcPath}/reducers`;

  makeDir(reducersPath).then((path) => {
    const reducerPath = `${path}/${reducerName}.js`;
    let reducerCode;

    if (fs.existsSync(reducerPath)) {
      console.log(`${reducerName}.js exists.`)

      const existingFile = fs.readFileSync(reducerPath).toString();
      reducerCode = modifyExistingReduxFile(reducerName, actions, existingFile);
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
  });
};
