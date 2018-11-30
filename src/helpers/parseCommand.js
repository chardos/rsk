const commands = require('../commands');

const parseCommand = async (obj) => {
  const { command } = obj;
  await commands[command](obj);
};

module.exports = parseCommand;
