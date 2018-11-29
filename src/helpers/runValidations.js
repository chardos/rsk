const findUp = require('find-up');

const runValidations = async (obj) => {
  const { config } = obj;
  const { codeDirectory } = config;

  const srcPath = await findUp(codeDirectory);
  if (!srcPath) throw new Error(`Couldn't find a ${codeDirectory} directory in your project.`);
  
  return {
    ...obj,
    srcPath
  };
};

module.exports = runValidations;
