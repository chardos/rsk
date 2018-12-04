const findUp = require('find-up');

const runValidations = async (data) => {
  const { config } = data;
  const { codeDirectory } = config;

  const srcPath = await findUp(codeDirectory);
  if (!srcPath) throw new Error(`Couldn't find a ${codeDirectory} directory in your project.`);
  
  return {
    ...data,
    srcPath
  };
};

module.exports = runValidations;
