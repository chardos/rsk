const parser = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const { renderSwitchStatement, renderActionCreator } = require('../renderers/redux');
const t =  require("@babel/types");

const addToExistingDuck = (reducerName, actions, existingFile) => {
  const ast = parser(existingFile, {sourceType: 'module'});

  // TODO: GET THE NEW ACTIONS IN HERE.

  let lastImport;
  traverse(ast, {
    ExportNamedDeclaration(path) {
      lastImport = path;
    }
  })
  
  const actionsCode = actions
    .map(renderActionCreator)
    .join('\n')

  lastImport.insertAfter(parser(actionsCode, {sourceType: 'module'}))

  const newCode = generate(ast).code;
  return newCode
}

module.exports = addToExistingDuck;