const Linter = require("eslint").Linter;
const prettier = require('prettier');

exports.prettify = (code) => prettier.format(code, { parser: 'babylon' })

exports.lint = (code) => {
  const linter = new Linter();
  const messages = linter.verify(code, {
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        semi: 2
    }
  });

  if (messages.length && messages[0].fatal) {
    throw new Error(messages[0].message);
  }
}