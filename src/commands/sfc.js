const changeCase = require('change-case');
const fs = require('fs');
const { prettify } = require('../utils');
const makeDir = require('make-dir');
const render = require('../renderers/react');

module.exports = async (obj) => {
  const { srcPath, command, config, positionalArgs } = obj;
  const { componentsDirectory } = config;

  const componentName = changeCase.pascalCase(positionalArgs[0]);
  const componentPath = `${srcPath}/${componentsDirectory}/${componentName}`;

  await makeDir(componentPath);
  const indexPath = `${componentPath}/index.js`;
  const actionCode = render[command](componentName);
  const prettifiedCode = prettify(actionCode);

  fs.writeFile(indexPath, prettifiedCode, (err) => {
    if (err) {
      throw new Error(err);
    }
  });
};
