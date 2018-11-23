const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const generate = require('babel-generator').default;

const addToExistingDuck = (reducerName, actions, existingFile) => {
  const ast = babylon.parse(existingFile, {sourceType: 'module'});
  
  traverse(ast, {
    enter(path) {
      if (path.node.type === "Identifier") {
        console.log('path.node.name', path.node.name);
        path.node.name = path.node.name.split("").reverse().join('');
      }
    }
  })

  console.log('ast.program.body', ast.program.body);
  const newCode = generate(ast);
  console.log('newCode', newCode);
  return newCode

  // console.log('ast', ast.program.body);
}

module.exports = addToExistingDuck;