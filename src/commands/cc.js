const fs = require('fs');
const prettier = require('prettier');
const makeDir = require('make-dir');
const render = require('../renderers/react');

module.exports = (obj) => {
  const { srcPath, componentName, command, config } = obj;
  const { componentsDirectory } = config;
  const componentPath = `${srcPath}/${componentsDirectory}/${componentName}`;

  makeDir(componentPath).then(() => {
    const indexPath = `${componentPath}/index.js`;
    const actionCode = render[command](componentName);
    const prettifiedCode = prettier.format(actionCode, { parser: 'babylon' });

    fs.writeFile(indexPath, prettifiedCode, (err) => {
      if (err) {
        console.error(err);
      }

      // file written successfully
    });
  });
};
