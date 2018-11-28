const fs = require('fs');
const prettier = require('prettier');
const makeDir = require('make-dir');
const generateDuckCode = require('./generateDuckCode');
const addActionsToReduxFile = require('../helpers/addActionsToReduxFile');
const logger = require('../helpers/logger');

module.exports = ({ srcPath, reducerName, actions }) => {
  const ducksDirectoryPath = `${srcPath}/ducks`;

  return makeDir(ducksDirectoryPath).then(() => {
    const duckFilePath = `${ducksDirectoryPath}/${reducerName}.js`;
    let duckCode;

    // check here if the file exists
    if (fs.existsSync(duckFilePath)) {
      logger.success(`ducks/${reducerName}.js exists. Adding actions: ${actions.join(', ')}`)

      const existingFile = fs.readFileSync(duckFilePath).toString();
      duckCode = addActionsToReduxFile(reducerName, actions, existingFile);
    } else {
      logger.success(`Creating ducks/${reducerName}.js`)
      duckCode = generateDuckCode(reducerName, actions);
    }
    
    const prettifiedCode = prettier.format(duckCode, { parser: 'babylon' });

    fs.writeFile(duckFilePath, prettifiedCode, (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  });
};
