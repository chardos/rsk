const commands = require('../commands');
const pkg = require('../../package.json');

const parseCommand = async (data) => {
  const { command, options } = data;

  if (options.v || options.version) {
    return console.log(pkg.version)
  }

  return await commands[command](data);
};

module.exports = parseCommand;
