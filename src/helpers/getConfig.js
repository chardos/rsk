const fs = require('fs');

const defaultConfig = {
  style: 'rails',
  codeDirectory: 'src',
  componentsDirectory: 'components',
};

const getConfig = (obj) => {
  const { path } = obj;

  return new Promise((resolve) => {
    if (path) {
      fs.readFile(path, 'utf8', (err, contents) => {
        const userConfig = JSON.parse(contents);
        const mergedConfig = {
          ...defaultConfig,
          ...userConfig,
        };

        resolve({
          ...obj,
          config: mergedConfig,
        });
      });
    } else {
      resolve({
        ...obj,
        config: defaultConfig,
      });
    }
  });
};

module.exports = getConfig;
