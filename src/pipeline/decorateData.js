const fs = require('fs');

const decorateData = (data) => {
  const { command, srcPath, positionalArgs, config: {style}} = data;
  const reducerFolder = (style === 'ducks') ? 'ducks' : 'reducers';

  if (command === 'reducer') {
    const [reducerName, ...actions] = positionalArgs;
    data.reducerName = reducerName;
    data.actions = actions;
    data.reducersRootPath = `${srcPath}/${reducerFolder}`;
    data.reducerPath = `${data.reducersRootPath}/${reducerName}.js`;
    data.reducerExists = fs.existsSync(data.reducerPath);
  }

  return {
    ...data,
    reducerFolder
  }
};

module.exports = decorateData;
