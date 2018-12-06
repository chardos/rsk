const fs = require('fs');

const defaultConfig = {
  style: 'rails',
  codeDirectory: 'src',
  componentsDirectory: 'components',
};

const getConfig = (data) => {
  const { configPath } = data;

  const userConfig = configPath
    ? require(configPath)
    : {};

  return {
    ...data,
    config: {
      ...defaultConfig,
      ...userConfig
    }
  }
};

module.exports = getConfig;
