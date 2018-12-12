const commands = require('../commands');
const package = require('../../package.json');

const parseCommand = async (data) => {
  const { command, options } = data;

  if (options.v || options.version) {
    return console.log(package.version)
  }

  return await commands[command](data);
};

module.exports = parseCommand;
