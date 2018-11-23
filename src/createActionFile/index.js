const fs = require('fs');
const prettier = require('prettier');
const makeDir = require('make-dir');
const generateActionCode = require('./generateActionCode');

module.exports = ({ srcPath, reducerName, actions }) => {
  const actionsPath = `${srcPath}/actions`;

  makeDir(actionsPath).then((path) => {
    const actionPath = `${path}/${reducerName}.js`;
    const actionCode = generateActionCode(reducerName, actions);
    const prettifiedCode = prettier.format(actionCode, { parser: 'babylon' });

    fs.writeFile(actionPath, prettifiedCode, (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  });
};
