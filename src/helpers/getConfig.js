const fs = require('fs');

const defaultConfig = {
  style: 'rails',
  codePath: 'src'
}

const getConfig = (obj) => {
  const { path } = obj;
  console.log(obj)
  
  return new Promise((resolve) => {
    if (path) {
      fs.readFile(path, 'utf8', function(err, contents) {
        const userConfig = JSON.parse(contents)
        const mergedConfig = {
          ...defaultConfig,
          ...userConfig
        };

        resolve({
          ...obj,
          config: mergedConfig
        });
      });
    } else {
      resolve({
        ...obj,
        config: defaultConfig
      });
    }
  })
}

module.exports = getConfig;