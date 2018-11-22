const fs = require('fs');
const prettier = require('prettier');
const makeDir = require('make-dir');
const render = require('../renderers/react');

module.exports = ({srcPath, componentName, command}) => {
  const componentsDirectory = `${srcPath}/components/${componentName}`;

  makeDir(componentsDirectory).then(() => {
    const componentPath = `${componentsDirectory}/index.js`;
    const actionCode = render[command](componentName);
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

