const minimist = require('minimist');
const findUp = require('find-up');
const createReducerFile = require('./createReducerFile');
const createActionFile = require('./createActionFile');
const createDuckFile = require('./createDuckFile');
const getConfig = require('./helpers/getConfig');
const CONFIG_FILE_NAME = '.rsk';

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  const commands = args._;
  const [reducerName, ...actions] = commands;

  findUp(CONFIG_FILE_NAME)
    .then(getConfig)
    .then(console.log)

  findUp('src')
    .then(srcPath => {
      if (!srcPath) throw new Error("Couldn't find a 'src' directory in the your project.")
      // createDuckFile({srcPath, reducerName, actions});
      createReducerFile({srcPath, reducerName, actions});
      createActionFile({srcPath, reducerName, actions});
    })
    .catch((err) => {
      console.log(err)
    })


  // TODO: find the file with combine reducers in it
  // use https://www.npmjs.com/package/find-in-files
}