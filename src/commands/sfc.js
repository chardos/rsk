const get = require('lodash.get');
const changeCase = require('change-case');
const fs = require('fs');
const { prettify } = require('../utils');
const makeDir = require('make-dir');
const render = require('../renderers/react');
const logger = require('../pipeline/logger');

module.exports = async (data) => {
  const { srcPath, command, config, positionalArgs } = data;
  const { componentsDirectory } = config;
  const componentName = changeCase.pascalCase(positionalArgs[0]);
  const componentPath = `${srcPath}/${componentsDirectory}/${componentName}`;

  const sfcTemplate = get(data, 'config.template.sfc');
  const finalTemplate = sfcTemplate || render.sfc;

  await makeDir(componentPath);
  const indexPath = `${componentPath}/index.js`;
  const code = finalTemplate(componentName);
  const prettifiedCode = prettify(code);

  fs.writeFile(indexPath, prettifiedCode, (err) => {
    if (err) {
      throw new Error(err);
    }
    logger.success(`components/${componentName}.js created.`)
  });

  return prettifiedCode;
};
