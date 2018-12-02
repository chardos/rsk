const renderSetupStore = require('../renderers/redux/setupStore');
const fs = require('fs');
const { prettify } = require('../utils');

module.exports = async (obj) => {
  const { srcPath, config: { style }, reducerFolder } = obj;
  console.log('obj', obj);
  console.log('reducerFolder', reducerFolder);
  const storePath = `${srcPath}/store.js`;
  const reducerIndexPath = `${srcPath}/${reducerFolder}/index.js`;
  const storeCode = renderSetupStore();

  const prettifiedStoreCode = prettify(storeCode);

  // create an index file
  const emptyReducersIndex = 'export default {}';

  fs.writeFile(storePath, prettifiedStoreCode, (err) => {
    if (err) console.error(err)
  });

  fs.writeFile(reducerIndexPath, emptyReducersIndex, (err) => {
    if (err) console.error(err)
  });

  return storeCode;
}
