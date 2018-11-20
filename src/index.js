const minimist = require('minimist');
const fs = require('fs');
const makeDir = require('make-dir');
const createReducerFile = require('./createReducerFile');
const createActionCode = require('./helpers/createActionCode');

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  const commands = args._;
  const [reducerName, ...actions] = commands;

  const actionsPath = 'src/actions';

  createReducerFile(reducerName, actions);
  
  makeDir(actionsPath).then(path => {
    const actionPath = `${path}/${reducerName}.js`;
    const actionCode = createActionCode(reducerName, actions);

    fs.writeFile(actionPath, actionCode, (err) => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
    })
  });

  // TODO: find the file with combine reducers in it
  // use https://www.npmjs.com/package/find-in-files
}