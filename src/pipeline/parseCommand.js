const commands = require('../commands');

const parseCommand = async (data) => {
  const { command } = data;
  return await commands[command](data);
};

module.exports = parseCommand;
