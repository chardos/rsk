const parser = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const { renderExportedConstant, renderActionCreator, generateCaseObject } = require('../renderers/redux');
const get = require('lodash.get');
const t = require("@babel/types");

/**
 * modifyExistingReduxFile -
 * This function will take any reducer, action, or duck file, and add
 * the new actions to it.
 */

const addToExistingDuck = (reducerName, actions, existingFile) => {
  const ast = parser(existingFile, {sourceType: 'module'});

  let lastConstantExport;
  let lastActionCreatorExport;
  let lastSwitchCaseStatement;

  traverse(ast, {
    ExportNamedDeclaration(path) {
      const init = get(path, 'node.declaration.declarations.0.init');
      const isArrowFn = t.isArrowFunctionExpression(init);
      const isStringLiteral = t.isStringLiteral(init);

      if (isStringLiteral) {
        lastConstantExport = path;
      }
      
      if (isArrowFn) {
        lastActionCreatorExport = path;
      }
    },

    SwitchCase(path) {
      lastSwitchCaseStatement = path;
    }
  })
  
  const constantsCode = actions
    .map(renderExportedConstant)
    .join('\n')

  const actionsCode = actions
    .map(renderActionCreator)
    .join('\n')

  const casesCode = actions.map(generateCaseObject);

  if (lastConstantExport) {
    lastConstantExport.insertAfter(parser(constantsCode, {sourceType: 'module'}))
  }

  if (lastActionCreatorExport) {
    lastActionCreatorExport.insertAfter(parser(actionsCode, {sourceType: 'module'}))
  }

  if (lastSwitchCaseStatement) {
    lastSwitchCaseStatement.insertBefore(casesCode)
  }

  const newCode = generate(ast).code;
  return newCode
}

module.exports = addToExistingDuck;