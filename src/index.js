const minimist = require('minimist');
const createReducerFile = require('./createReducerFile');
const createActionFile = require('./createActionFile');
const createDuckFile = require('./createDuckFile');

const findUp = require('find-up');

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  const commands = args._;
  const [reducerName, ...actions] = commands;

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