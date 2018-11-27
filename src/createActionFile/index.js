const fs = require('fs');
const prettier = require('prettier');
const makeDir = require('make-dir');
const generateActionCode = require('./generateActionCode');
const addActionsToReduxFile = require('../helpers/addActionsToReduxFile');

module.exports = async ({ srcPath, reducerName, actions }) => {
  const actionsPath = `${srcPath}/actions`;

  const path = await makeDir(actionsPath);
  const actionPath = `${path}/${reducerName}.js`;
  let actionCode;

  if (fs.existsSync(actionPath)) {
    console.log(`actions/${reducerName}.js exists.`)

    const existingFile = fs.readFileSync(actionPath).toString();
    actionCode = addActionsToReduxFile(reducerName, actions, existingFile);
  } else {
    actionCode = generateActionCode(reducerName, actions);
  }

  const prettifiedCode = prettier.format(actionCode, { parser: 'babylon' });

  fs.writeFile(actionPath, prettifiedCode, (err) => {
    if (err) console.error(err)
  });
};
