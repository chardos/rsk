const fs = require('fs');
const { REDUCER, CONNECT } = require('../constants/commands');

const decorateData = (data) => {
  const { command, srcPath, positionalArgs, config: {style, componentsDirectory}} = data;
  data.reducerFolder = (style === 'ducks') ? 'ducks' : 'reducers';
  data.componentsRootPath = `${srcPath}/${componentsDirectory}`;
  data.reducersRootPath = `${srcPath}/${data.reducerFolder}`;

  if (command === REDUCER) {
    const [reducerName, ...actions] = positionalArgs;
    data.reducerName = reducerName;
    data.actions = actions;
    data.reducerPath = `${data.reducersRootPath}/${reducerName}.js`;
    data.reducerExists = fs.existsSync(data.reducerPath);
  }

  if (command === CONNECT) {
    const [componentName, ...reducerNames] = positionalArgs;
    data.componentName = componentName;
    data.reducerNames = reducerNames;
    data.componentPath = `${data.componentsRootPath}/${componentName}/index.js`;
  }

  return data;
};

module.exports = decorateData;
