const changeCase = require('change-case');
const fs = require('fs');
const prettier = require('prettier');
const makeDir = require('make-dir');
const render = require('../renderers/react');

module.exports = (obj) => {
  const { srcPath, command, config, positionalArgs } = obj;
  const { componentsDirectory } = config;

  const componentName = changeCase.pascalCase(positionalArgs[0]);
  const componentPath = `${srcPath}/${componentsDirectory}/${componentName}`;

  makeDir(componentPath).then(() => {
    const indexPath = `${componentPath}/index.js`;
    const actionCode = render[command](componentName);
    const prettifiedCode = prettier.format(actionCode, { parser: 'babylon' });

    fs.writeFile(indexPath, prettifiedCode, (err) => {
      if (err) {
        throw new Error(err);
      }
    });
  });
};
