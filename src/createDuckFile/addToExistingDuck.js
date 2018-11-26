const parser = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const { renderExportedConstant, renderSwitchStatement, renderActionCreator } = require('../renderers/redux');
const t =  require("@babel/types");

const addToExistingDuck = (reducerName, actions, existingFile) => {
  const ast = parser(existingFile, {sourceType: 'module'});

  // TODO: GET THE NEW ACTIONS IN HERE.

  let lastConstantExport;
  let lastActionCreatorExport;

  traverse(ast, {
    ExportNamedDeclaration(path) {

      const init = path.get('declaration.declarations.0.init');
      const isArrowFn = t.isArrowFunctionExpression(init);
      const isStringLiteral = t.isStringLiteral(init);

      if (isStringLiteral) {
        lastConstantExport = path;
      }
      
      if (isArrowFn) {
        lastActionCreatorExport = path;
      }
      
      // console.log('path.node', path.node);
      // console.log('t.isArrowFunctionExpression(path.node)', t.isArrowFunctionExpression(path.node));
    }
  })
  
  const constantsCode = actions
    .map(renderExportedConstant)
    .join('\n')

  const actionsCode = actions
    .map(renderActionCreator)
    .join('\n')

  lastConstantExport.insertAfter(parser(constantsCode, {sourceType: 'module'}))
  lastActionCreatorExport.insertAfter(parser(actionsCode, {sourceType: 'module'}))

  const newCode = generate(ast).code;
  return newCode
}

module.exports = addToExistingDuck;