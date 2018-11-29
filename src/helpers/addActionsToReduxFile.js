const Linter = require("eslint").Linter;
const parser = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const { renderExportedConstant, renderActionCreator, generateCaseObject, makeImportSpecifier } = require('../renderers/redux');
const { checkHasDuplicates, lint } = require('../utils');
const get = require('lodash.get');
const t = require("@babel/types");

/**
 * addActionsToReduxFile -
 * This function will take any reducer, action, or duck file, and add
 * the new actions to it.
 */

const addActionsToReduxFile = (reducerName, actions, existingFile) => {
  const ast = parser(existingFile, {sourceType: 'module'});

  let lastConstantExport;
  let lastActionCreatorExport;
  let lastSwitchCaseStatement;
  let lastImportSpecifier;

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
    },

    ImportSpecifier(path) {
      lastImportSpecifier = path;
    }
  })
  
  const constantsCode = actions
    .map(renderExportedConstant)
    .join('\n')

  const actionCreatorsCode = actions
    .map(renderActionCreator)
    .join('\n')

  const casesCode = actions.map(generateCaseObject);

  if (lastConstantExport) {
    lastConstantExport.insertAfter(parser(constantsCode, {sourceType: 'module'}))
  }

  if (lastActionCreatorExport) {
    lastActionCreatorExport.insertAfter(parser(actionCreatorsCode, {sourceType: 'module'}))
  }

  if (lastSwitchCaseStatement) {
    lastSwitchCaseStatement.insertBefore(casesCode)
  }

  if (lastImportSpecifier) {
    const specifiers = actions.map(makeImportSpecifier)
    lastImportSpecifier.insertAfter(specifiers)
  }

  // throw error if any 2 actions are the same in the import.
  if (lastImportSpecifier) {
    const names = lastImportSpecifier.parent.specifiers.map(specifier => specifier.imported.name)
    const hasDuplicates = checkHasDuplicates(names);
    if (hasDuplicates) {
      // throw new Error(`Duplicate actions detected in import statement in ${reducerName}. You might be trying to add an action that already exists.`);
    }
  }
  
  const newCode = generate(ast).code;

  lint(newCode);

  return newCode
}




module.exports = addActionsToReduxFile;