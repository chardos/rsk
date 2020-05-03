const fs = require('fs');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const { renderConnectedDefaultExport } = require('../renderers/redux');
const { parse, prettify, lint } = require('../utils');
const logger = require('../pipeline/logger');

module.exports = async data => {
  const { componentPath, reducerNames } = data;

  const componentExists = fs.existsSync(componentPath);

  if (!componentExists) {
    throw new Error(`Sorry, couldn't find a component at ${componentPath}.`);
  }

  const existingFile = fs.readFileSync(componentPath).toString();
  const ast = parse(existingFile);
  let reactImportPath;
  let exportDefaultPath;

  traverse(ast, {
    ImportDeclaration(path) {
      if (path.node.source.value === 'react') {
        reactImportPath = path;
      }
    },

    ExportDefaultDeclaration(path) {
      exportDefaultPath = path;
    }
  });

  const declarationName = exportDefaultPath.node.declaration.name;

  reactImportPath.insertAfter(
    parse(`
    import { connect } from 'react-redux';
  `)
  );

  exportDefaultPath.replaceWith(
    parse(
      renderConnectedDefaultExport({
        componentName: declarationName,
        reducerNames
      })
    )
  );

  const newCode = generate(ast).code;
  const prettifiedCode = prettify(newCode);
  logger.log('prettifiedCode', prettifiedCode);

  lint(prettifiedCode);

  fs.writeFile(componentPath, prettifiedCode, err => {
    if (err) throw new Error(err);
  });
};
