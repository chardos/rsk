const chalk = require('chalk');

const error = err => {
  console.log(chalk.red(err.message));
  if (process.env.DEBUG === 'true') {
    console.log(err.stack);
  }
};
const success = text => console.log(chalk.green(text));
const warn = text => console.log(chalk.yellow(text));

// Use for debugging. Only visible when DEBUG true.
const log = (...args) => {
  if (process.env.DEBUG === 'true') {
    console.log(...args);
  }
};

module.exports = {
  error,
  success,
  warn,
  log
};
