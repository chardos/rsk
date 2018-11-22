const fs = require('fs');
const prettier = require('prettier');
const makeDir = require('make-dir');
const { renderSfc } = require('../renderers/react');

module.exports = ({srcPath, componentName}) => {
  const componentsDirectory = `${srcPath}/components/${componentName}`;

  makeDir(componentsDirectory).then(() => {
    const componentPath = `${componentsDirectory}/index.js`;
    const actionCode = renderSfc(componentName);
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

