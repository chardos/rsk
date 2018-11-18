const minimist = require('minimist');
const fs = require('fs');
const makeDir = require('make-dir');
const createReducerCode = require('./helpers/createReducerCode');

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  const commands = args._;
  const name = commands[0];

  const actionsPath = 'src/actions';
  const reducersPath = 'src/reducers';


  makeDir(reducersPath).then(path => {
    const reducerPath = `${path}/${name}.js`;
    const reducerCode = createReducerCode(name);

    fs.writeFile(reducerPath, reducerCode, (err) => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
    })
  });
}