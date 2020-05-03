const fs = require('fs');
const makeDir = require('make-dir');
const generateDuckCode = require('../renderers/redux/generateDuckCode');
const addActionsToReduxFile = require('../pipeline/addActionsToReduxFile');
const logger = require('../pipeline/logger');
const { prettify, lint } = require('../utils');

module.exports = ({ srcPath, reducerName, actions, config }) => {
  const ducksDirectoryPath = `${srcPath}/${config.storeDirectory}`;

  return makeDir(ducksDirectoryPath).then(() => {
    const duckFilePath = `${ducksDirectoryPath}/${reducerName}.js`;
    let duckCode;

    // check here if the file exists
    if (fs.existsSync(duckFilePath)) {
      logger.success(
        `${reducerName}.js exists. Adding actions: ${actions.join(', ')}`
      );

      const existingFile = fs.readFileSync(duckFilePath).toString();
      duckCode = addActionsToReduxFile(reducerName, actions, existingFile);
    } else {
      logger.success(`Creating ${reducerName}.js`);
      duckCode = generateDuckCode(reducerName, actions);
    }

    const prettifiedCode = prettify(duckCode);

    lint(prettifiedCode);

    fs.writeFile(duckFilePath, prettifiedCode, err => {
      if (err) {
        console.error(err);
      }
    });
  });
};
