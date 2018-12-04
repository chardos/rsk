const fs = require('fs');

const defaultConfig = {
  style: 'rails',
  codeDirectory: 'src',
  componentsDirectory: 'components',
};

const getConfig = (data) => {
  const { path } = data;

  return new Promise((resolve) => {
    if (path) {
      fs.readFile(path, 'utf8', (err, contents) => {
        const userConfig = JSON.parse(contents);
        const mergedConfig = {
          ...defaultConfig,
          ...userConfig,
        };

        resolve({
          ...data,
          config: mergedConfig,
        });
      });
    } else {
      resolve({
        ...data,
        config: defaultConfig,
      });
    }
  });
};

module.exports = getConfig;
