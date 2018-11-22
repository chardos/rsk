const minimist = require('minimist');
const findUp = require('find-up');
const getConfig = require('./helpers/getConfig');
const createFiles = require('./helpers/createFiles');
const CONFIG_FILE_NAME = '.rsk';
const logger = require('./helpers/logger');

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  const commands = args._;
  const [reducerName, ...actions] = commands;

  findUp(CONFIG_FILE_NAME)
    .then((path) => ({path, reducerName, actions}))
    .then(getConfig)
    .then(createFiles)
    .catch(logger.error)

  // TODO: find the file with combine reducers in it
  // use https://www.npmjs.com/package/find-in-files
}