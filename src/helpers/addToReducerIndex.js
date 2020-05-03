const fs = require('fs');
const parser = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const logger = require('../pipeline/logger');
const { lint } = require('../utils');
const { prettify } = require('../utils');
const t = require("@babel/types");

module.exports = async (data) => {
  const { paths, reducerName, style } = data;
  const { srcPath, reducerFolder } = paths;
  const reducerIndexPath = `${srcPath}/${reducerFolder}/index.js`;
  const reducerIndexExists = fs.existsSync(reducerIndexPath);

  if (reducerIndexExists) {
    const existingFile = fs.readFileSync(reducerIndexPath).toString();
    const ast = parser(existingFile, {sourceType: 'module'});
    let existingReducers = [];
    let properties;

    traverse(ast, {
      ExportDefaultDeclaration(path) {
        exportDefaultPath = path;
      },

      Property(path) {
        existingReducers.push(path.node.key.name);
      },

      ObjectExpression(path) {
        properties = path.parent.declaration.properties
      },
    })

    const reducerIsInIndex = existingReducers.includes(reducerName);

    if (!reducerIsInIndex) {
      logger.success(`${reducerFolder}/index.js exists. Adding reducer: ${reducerName}`)

      // add import
      let importCode;
      if (style === 'rails') {
        importCode = `import ${reducerName} from './${reducerName}'`;
      } else {
        importCode = `import ${reducerName} from './${reducerName}/reducer'`;
      }
      exportDefaultPath.insertBefore(parser(importCode, {sourceType: 'module'}));

      // add export
      const id = t.identifier(reducerName)
      properties.push(t.objectProperty(id, id, false, true))

      const newCode = generate(ast).code;
      const prettifiedCode = prettify(newCode);
      lint(prettifiedCode);

      fs.writeFile(reducerIndexPath, prettifiedCode, (err) => {
        if (err) throw new Error(`addToReducerIndex.js write error: ${err}`)
      });
    } 
  } else {
    throw new Error(`Sorry, we couldn't find an index.js in your /${reducerFolder} folder.`)
  }  
};
