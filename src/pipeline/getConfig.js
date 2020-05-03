const fs = require("fs");

const defaultConfig = {
  combineActionsAndReducers: false,
  codeDirectory: "src",
  storeDirectory: "store",
  componentsDirectory: "components",
};

const getConfig = ({ configPath, options }) => {

  const userConfig = configPath ? require(configPath) : {};

  return {
    ...defaultConfig,
    ...userConfig,
    ...options,
  };
};

module.exports = getConfig;
