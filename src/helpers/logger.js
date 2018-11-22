const chalk = require('chalk');

const error = (err) => {
  console.log(chalk.red(err.message))
  console.log(err.stack)
}
const success = (text) => console.log(chalk.green(text))

module.exports = {
  error,
  success
}