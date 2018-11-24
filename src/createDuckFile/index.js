const fs = require('fs');
const prettier = require('prettier');
const makeDir = require('make-dir');
const generateDuckCode = require('./generateDuckCode');
const addToExistingDuck = require('./addToExistingDuck');

module.exports = ({ srcPath, reducerName, actions }) => {
  const ducksDirectoryPath = `${srcPath}/ducks`;

  return makeDir(ducksDirectoryPath).then(() => {
    const duckFilePath = `${ducksDirectoryPath}/${reducerName}.js`;
    let duckCode;

    // check here if the file exists
    if (fs.existsSync(duckFilePath)) {
      console.log(`${reducerName}.js exists.`)

      const existingFile = fs.readFileSync(duckFilePath).toString();
      duckCode = addToExistingDuck(reducerName, actions, existingFile);
    } else {
      duckCode = generateDuckCode(reducerName, actions);
    }
    
    const prettifiedCode = prettier.format(duckCode, { parser: 'babylon' });

    fs.writeFile(duckFilePath, prettifiedCode, (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  });
};
