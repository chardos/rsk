const parser = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t =  require("@babel/types");

const addToExistingDuck = (reducerName, actions, existingFile) => {
  const ast = parser(existingFile, {sourceType: 'module'});

  // TODO: GET THE NEW ACTIONS IN HERE.

  let lastImport;
  traverse(ast, {
    ExportNamedDeclaration(path) {
      lastImport = path;
      console.log('path.container.unshift',path.container.unshift)
    }
  })

  lastImport.insertAfter(t.arrowFunctionExpression(
    [],
    t.blockStatement([
      t.returnStatement(t.stringLiteral('bro'))
    ])
  ));

  // t.importDeclaration( [t.importDefaultSpecifier(t.identifier('tasksReducer'))], t.stringLiteral('./reducers/tasks'), )


  const newCode = generate(ast).code;
  return newCode
}

module.exports = addToExistingDuck;