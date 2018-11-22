const fs = require('fs');

const defaultConfig = {
  style: 'rails',
  codePath: 'src'
}

const getConfig = (path) => {
  return new Promise((resolve) => {
    if (path) {
      fs.readFile(path, 'utf8', function(err, contents) {
        const userConfig = JSON.parse(contents)

        resolve({
          ...defaultConfig,
          ...userConfig
        });
      });
    } else {
      resolve(defaultConfig)
    }
  })
}

module.exports = getConfig;