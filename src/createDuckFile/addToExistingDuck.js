const parser = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const { renderExportedConstant, renderActionCreator, generateCaseObject } = require('../renderers/redux');
const t = require("@babel/types");

const addToExistingDuck = (reducerName, actions, existingFile) => {
  const ast = parser(existingFile, {sourceType: 'module'});

  // TODO: GET THE NEW ACTIONS IN HERE.

  let lastConstantExport;
  let lastActionCreatorExport;
  let lastSwitchCaseStatement;

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

  // const rando = t.switchCase(
  //   t.identifier('BIM_BAM'),
  //   [
  //     t.returnStatement(
  //       t.identifier('state')
  //     )
  //   ]
  // );

  // console.log(
  //   'slamburger',
  //   rando
  // );

  lastConstantExport.insertAfter(parser(constantsCode, {sourceType: 'module'}))
  lastActionCreatorExport.insertAfter(parser(actionsCode, {sourceType: 'module'}))
  lastSwitchCaseStatement.insertBefore(casesCode)

  const newCode = generate(ast).code;
  return newCode
}

module.exports = addToExistingDuck;