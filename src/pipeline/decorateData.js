const fs = require('fs');
const { REDUCER, CONNECT } = require('../constants/commands');

const decorateData = ({ command, positionalArgs, paths }) => {
  const data = {};

  if (command === REDUCER) {
    const [reducerName, ...actions] = positionalArgs;
    data.reducerName = reducerName;
    data.actions = actions;
    data.reducerPath = `${paths.reducersRootPath}/${reducerName}.js`;
    data.reducerExists = fs.existsSync(paths.reducerPath);
  }

  if (command === CONNECT) {
    const [componentName, ...reducerNames] = positionalArgs;
    data.componentName = componentName;
    data.reducerNames = reducerNames;
    data.componentPath = `${
      paths.componentsRootPath
    }/${componentName}/index.js`;
  }

  return data;
};

module.exports = decorateData;
