const renderSetupStore = require('../renderers/redux/setupStore');
const fs = require('fs');

module.exports = (obj) => {
  const { srcPath } = obj;
  const storePath = `${srcPath}/store.js`;
  const code = renderSetupStore();

  fs.writeFile(storePath, code, (err) => {
    if (err) console.error(err)
  });

  // post it to the file src
}