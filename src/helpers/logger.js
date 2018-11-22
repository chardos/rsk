const chalk = require('chalk');

const error = (text) => console.log(chalk.red(text))
const success = (text) => console.log(chalk.green(text))

module.exports = {
  error,
  success
}