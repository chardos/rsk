const findUp = require('find-up');
const createReducerFile = require('../createReducerFile');
const createActionFile = require('../createActionFile');
const createDuckFile = require('../createDuckFile');

const createFiles = async(obj) => {
  const { config, reducerName, actions } = obj;
  const { codePath, style } = config;
  
  const srcPath = await findUp(codePath);

  if (!srcPath) throw new Error(`Couldn't find a ${codePath} directory in the your project.`)
  
  if (style === 'rails') {
    createReducerFile({srcPath, reducerName, actions});
    createActionFile({srcPath, reducerName, actions});
  }

  if (style === 'ducks') {
    createDuckFile({srcPath, reducerName, actions});
  }
}

module.exports = createFiles;