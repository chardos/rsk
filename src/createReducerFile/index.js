const fs = require('fs');
const prettier = require('prettier');
const makeDir = require('make-dir');
const generateReducerCode = require('./generateReducerCode');

module.exports = ({ srcPath, reducerName, actions }) => {
  const reducersPath = `${srcPath}/reducers`;

  makeDir(reducersPath).then((path) => {
    const reducerPath = `${path}/${reducerName}.js`;
    const reducerCode = generateReducerCode(reducerName, actions);
    const prettifiedCode = prettier.format(reducerCode, { parser: 'babylon' });

    fs.writeFile(reducerPath, prettifiedCode, (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  });
};
