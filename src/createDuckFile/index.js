const fs = require('fs');
const prettier = require('prettier');
const makeDir = require('make-dir');
const generateDuckCode = require('./generateDuckCode');

module.exports = ({ srcPath, reducerName, actions }) => {
  const ducksDirectoryPath = `${srcPath}/ducks`;

  return makeDir(ducksDirectoryPath).then(() => {
    const duckFilePath = `${ducksDirectoryPath}/${reducerName}.js`;
    const duckCode = generateDuckCode(reducerName, actions);
    const prettifiedCode = prettier.format(duckCode, { parser: 'babylon' });

    fs.writeFile(duckFilePath, prettifiedCode, (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  });
};
