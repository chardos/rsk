const renderSetupStore = require('../renderers/redux/setupStore');
const fs = require('fs');
const { prettify } = require('../utils');

module.exports = async (obj) => {
  const { srcPath, config: { style }, reducerFolder } = obj;
  const storePath = `${srcPath}/store.js`;
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

  fs.writeFile(storePath, prettifiedStoreCode, (err) => {
    if (err) throw new Error(`Setup store write error: ${err}`)
  });

  fs.writeFile(reducerIndexPath, emptyReducersIndex, (err) => {
    if (err) throw new Error(`Setup store write error: ${err}`)
  });

  return storeCode;
}
