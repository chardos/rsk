const fs = require('fs');
const prettier = require('prettier');
const makeDir = require('make-dir');
const generateActionCode = require('./generateActionCode');

module.exports = ({srcPath, reducerName, actions}) => {
  const componentsDirectory = `${srcPath}/components`;

  makeDir(componentsDirectory).then(path => {
    const componentPath = `${path}/${reducerName}.js`;
    const actionCode = generateActionCode(reducerName, actions);
    const prettifiedCode = prettier.format(actionCode, {parser: 'babylon'});

    fs.writeFile(componentPath, prettifiedCode, (err) => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
    })
  });
}

