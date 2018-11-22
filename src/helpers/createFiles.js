const changeCase = require('change-case')
const findUp = require('find-up');
const createReducerFile = require('../createReducerFile');
const createActionFile = require('../createActionFile');
const createDuckFile = require('../createDuckFile');
const createComponentFile = require('../createComponentFile');

const createFiles = async(obj) => {
  console.log(obj)
  const { config, command, positionalArgs } = obj;
  const { codeDirectory, style } = config;
  
  const srcPath = await findUp(codeDirectory);

  if (!srcPath) throw new Error(`Couldn't find a ${codeDirectory} directory in the your project.`)
  
  if (command === 'sfc' || command === 'cc') {
    const [componentName] = positionalArgs;
    const pascalCaseName = changeCase.pascalCase(componentName);

    await createComponentFile({
      srcPath,
      componentName: pascalCaseName,
      command,
      config
    });
  }

  if (command === 'reducer') {
    const [reducerName, ...actions] = positionalArgs;
    if (style === 'rails') {
      await createReducerFile({srcPath, reducerName, actions});
      await createActionFile({srcPath, reducerName, actions});
    }
  
    if (style === 'ducks') {
      await createDuckFile({srcPath, reducerName, actions});
    }
  }
}

module.exports = createFiles;
