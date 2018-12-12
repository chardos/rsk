const findUp = require('find-up');
const { COMMANDS } = require('../constants/commands');

const runValidations = async (data) => {
  const { config, command } = data;
  const { codeDirectory } = config;

  const srcPath = await findUp(codeDirectory);
  if (!srcPath) throw new Error(`Couldn't find a ${codeDirectory} directory in your project.`);

  if (command && !COMMANDS.includes(command)) {
    throw new Error(`${command} is not a valid command.`);
  }
  
  return {
    ...data,
    srcPath
  };
};

module.exports = runValidations;
