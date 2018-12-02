const fs = require('fs');
const prettier = require('prettier');
const makeDir = require('make-dir');
const generateActionCode = require('../renderers/redux/generateActionCode');
const addActionsToReduxFile = require('../pipeline/addActionsToReduxFile');
const logger = require('../pipeline/logger');
const { lint } = require('../utils');

module.exports = async ({ srcPath, reducerName, actions }) => {
  const actionsPath = `${srcPath}/actions`;

  const path = await makeDir(actionsPath);
  const actionPath = `${path}/${reducerName}.js`;
  let actionCode;

  if (fs.existsSync(actionPath)) {
    logger.success(`actions/${reducerName}.js exists. Adding actions: ${actions.join(', ')}`)

    const existingFile = fs.readFileSync(actionPath).toString();
    actionCode = addActionsToReduxFile(reducerName, actions, existingFile);
  } else {
    logger.success(`Creating actions/${reducerName}.js`)
    actionCode = generateActionCode(reducerName, actions);
  }

  const prettifiedCode = prettier.format(actionCode, { parser: 'babylon' });
  lint(prettifiedCode);


  fs.writeFile(actionPath, prettifiedCode, (err) => {
    if (err) console.error(err)
  });
};
