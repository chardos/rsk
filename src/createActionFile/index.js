const fs = require('fs');
const prettier = require('prettier');
const makeDir = require('make-dir');
const generateActionCode = require('./generateActionCode');

module.exports = (reducerName, actions) => {
  const actionsPath = 'src/actions';

  makeDir(actionsPath).then(path => {
    const actionPath = `${path}/${reducerName}.js`;
    const actionCode = generateActionCode(reducerName, actions);
    const prettifiedCode = prettier.format(actionCode, {parser: 'babylon'});

    console.log(prettifiedCode)

    fs.writeFile(actionPath, prettifiedCode, (err) => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
    })
  });
}