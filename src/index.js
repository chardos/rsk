const minimist = require("minimist");
const findUp = require("find-up");
const getConfig = require("./pipeline/getConfig");
const decorateData = require("./pipeline/decorateData");
const parseCommand = require("./pipeline/parseCommand");
const warnMissingDependencies = require("./pipeline/warnMissingDependencies");
const runValidations = require("./pipeline/runValidations");
const logger = require("./pipeline/logger");

const CONFIG_FILE_NAME = ".rsk.js";

module.exports = async () => {
  const args = minimist(process.argv.slice(2));
  const { _: commands, ...options } = args;
  const [command, ...positionalArgs] = commands;

  const configPath = await findUp(CONFIG_FILE_NAME);
  await warnMissingDependencies(command);
  const config = getConfig({ configPath, options });

  const { codeDirectory, style, componentsDirectory } = config;

  const srcPath = await findUp(codeDirectory);
  if (!srcPath)
    throw new Error(
      `Couldn't find a ${codeDirectory} directory in your project.`
    );

  const reducerFolder = config.style === "ducks" ? "ducks" : "reducers";
  const paths = {
    srcPath,
    reducerFolder,
    componentsRootPath: `${srcPath}/${componentsDirectory}`,
    reducersRootPath: `${srcPath}/${reducerFolder}`,
  };

  const data = decorateData({command, positionalArgs, paths})

  await parseCommand({ command, options, paths, config, positionalArgs, ...data })

  // return await findUp(CONFIG_FILE_NAME)
  //   .then(configPath => ({ configPath, command, positionalArgs, options }))
  //   .then(warnMissingDependencies)
  //   .then(getConfig)
  //   .then(runValidations)
  //   .then(decorateData)
  //   .then(parseCommand)
  //   .catch(logger.error);
};
