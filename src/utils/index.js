const prettier = require('prettier');

exports.checkHasDuplicates = (arr) => {
  const set = new Set(arr);
  return set.size !== arr.length;
}

exports.prettify = (code) => prettier.format(code, { parser: 'babylon' })