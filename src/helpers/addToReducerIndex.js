const fs = require('fs');
const parser = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const logger = require('../pipeline/logger');
const { lint } = require('../utils');
const { prettify } = require('../utils');
const t = require("@babel/types");

module.exports = async (data) => {
  const { srcPath, reducerFolder, positionalArgs } = data;
  const reducerIndexPath = `${srcPath}/${reducerFolder}/index.js`;
  const reducerName = positionalArgs[0];

  if (fs.existsSync(reducerIndexPath)) {
    logger.success(`${reducerFolder}/index.js exists. Adding reducer: ${reducerName}`)

    const existingFile = fs.readFileSync(reducerIndexPath).toString();
    const ast = parser(existingFile, {sourceType: 'module'});

    traverse(ast, {
      ExportDefaultDeclaration(path) {
        const importCode = `import ${reducerName} from './${reducerName}'`;
        path.insertBefore(parser(importCode, {sourceType: 'module'}));
      },

      ObjectExpression(path) {
        const properties = path.parent.declaration.properties
        const id = t.identifier(reducerName)
        properties.push(t.objectProperty(id, id, false, true))
      },
    })

    const newCode = generate(ast).code;


    const prettifiedCode = prettify(newCode);
    lint(prettifiedCode);

    fs.writeFile(reducerIndexPath, prettifiedCode, (err) => {
      if (err) console.error(err)
    });
  } else {
    logger.error(`Sorry, we couldn't find an index.js in your /${reducerFolder} folder.`)
  }  
};
