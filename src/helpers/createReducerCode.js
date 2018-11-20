const changeCase = require('change-case')

function createReducerCode(name, actions) {
  return `
  ${renderImports(name, actions)}
  
function ${name}(state = {}, action) {
  switch (action.type) {
${renderCases(actions)}
     default:
       return state;
  }
}

export default ${name}
`
}

const renderCases = (actions) => {
  const cases = actions.map((actionName) => {
    const constantName = changeCase.constantCase(actionName);
    return `    case ${constantName}:
      return state;

`
  });

  return cases.join('');
}

const renderImports = (name, actions) => {
  const imports = actions.map(actionName => {
    return `  ${changeCase.constantCase(actionName)},`
  })

  const importString = imports.join('\n')

  return `
import { 
${importString}
} from './actions/${name}'  
  `
}


module.exports = createReducerCode;
