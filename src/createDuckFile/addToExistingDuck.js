const parser = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const addToExistingDuck = (reducerName, actions, existingFile) => {
  const ast = parser(existingFile, {sourceType: 'module'});

  // TODO: GET THE NEW ACTIONS IN HERE.
  
  traverse(ast, {
    enter(path) {
      if (path.node.type === "Identifier") {
        // console.log('path.node.name', path.node.name);
        // path.node.name = path.node.name.split("").reverse().join('');
        // console.log('path.node.name', path.node.name);
      }
    }
  })

  const newCode = generate(ast).code;
  return newCode
}

module.exports = addToExistingDuck;