const minimist = require("minimist");
const findUp = require("find-up");
const resolveConfig = require("./pipeline/resolveConfig");
const decorateData = require("./pipeline/decorateData");
const parseCommand = require("./pipeline/parseCommand");
const warnMissingDependencies = require("./pipeline/warnMissingDependencies");
const runValidations = require("./pipeline/runValidations");

const CONFIG_FILE_NAME = ".rsk.js";

module.exports = async () => {
  const args = minimist(process.argv.slice(2));
  const { _: commands, ...options } = args;
  const [command, ...positionalArgs] = commands;

  const configPath = await findUp(CONFIG_FILE_NAME);
  await warnMissingDependencies(command);
  const config = resolveConfig({ configPath, options });
  runValidations({ config, command });

  const { codeDirectory, storeDirectory, componentsDirectory } = config;

  const srcPath = await findUp(codeDirectory);
  if (!srcPath)
    throw new Error(
      `Couldn't find a ${codeDirectory} directory in your project.`
    );

  const reducerFolder = storeDirectory;
  const paths = {
    srcPath,
    reducerFolder,
    componentsRootPath: `${srcPath}/${componentsDirectory}`,
    reducersRootPath: `${srcPath}/${reducerFolder}`,
  };

  const data = decorateData({ command, positionalArgs, paths });

  await parseCommand({
    command,
    options,
    paths,
    config,
    positionalArgs,
    ...data,
  });
};
