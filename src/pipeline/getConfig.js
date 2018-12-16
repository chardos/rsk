const fs = require('fs');

const defaultConfig = {
  style: 'rails',
  codeDirectory: 'src',
  componentsDirectory: 'components',
};

const getConfig = (data) => {
  const { configPath, options } = data;

  const userConfig = configPath
    ? require(configPath)
    : {};

  console.log('userConfig', userConfig);
  console.log('options', options);
  return {
    ...data,
    config: {
      ...defaultConfig,
      ...userConfig,
      ...options
    }
  }
};

module.exports = getConfig;
