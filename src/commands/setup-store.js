const renderSetupStore = require('../renderers/redux/setupStore');
const fs = require('fs');
const { prettify } = require('../utils');
const makeDir = require('make-dir');
const logger = require('../pipeline/logger');

module.exports = async (data) => {
  console.log('aaa: data', data);
  const { paths } = data;
  const { srcPath, reducerFolder } = paths;
  const storePath = `${srcPath}/store.js`;
  const reducerDirectoryPath = `${srcPath}/${reducerFolder}`;
  const reducerIndexPath = `${srcPath}/${reducerFolder}/index.js`;
  const storeCode = renderSetupStore(reducerFolder);

  const prettifiedStoreCode = prettify(storeCode);

  // create an index file
  const emptyReducersIndex = 'export default {}';

  // Check for existing store.
  const storeExists = fs.existsSync(storePath);

  if (storeExists) {
    throw new Error(`Sorry, new store can't be created. A store already exists at ${storePath}.`)
  }

  // Look for existing reducers, and add if any.
  // 1. Check if .rsk file has a location.
  // 2. Check under both names, /reducers and /ducks
  // 3. Check codebase for "combineReducers" ?
  // 3. "Found a reducers folder at ${path}". Adding to your .rsk"

  fs.writeFile(storePath, prettifiedStoreCode, (err) => {
    if (err) throw new Error(`Setup store write error: ${err}`)
    logger.success(`${storePath} created.`)
  });
  

  await makeDir(reducerDirectoryPath);
  fs.writeFile(reducerIndexPath, emptyReducersIndex, (err) => {
    if (err) throw new Error(`Setup store write error: ${err}`)
    logger.success(`${reducerIndexPath} created.`)
  });

  return storeCode;
}
