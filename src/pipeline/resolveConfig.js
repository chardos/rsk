const defaultConfig = {
  combineActionsAndReducers: false,
  codeDirectory: 'src',
  storeDirectory: 'store',
  componentsDirectory: 'components'
};

const resolveConfig = ({ configPath, options }) => {
  const userConfig = configPath ? require(configPath) : {};

  return {
    ...defaultConfig,
    ...userConfig,
    ...options
  };
};

module.exports = resolveConfig;
