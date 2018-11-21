const changeCase = require('change-case')

function createReducerCode(name, actions) {
  return `
    ${renderImports(name, actions)}
    
    ${renderSwitchStatement(name, actions)}

    export default ${name}
  `
}

const renderSwitchStatement = (name, actions) => {
  return `
    function ${name}(state = {}, action) {
      switch (action.type) {
        ${renderCases(actions)}
        default:
          return state;
      }
    }
  `
}

const renderCases = (actions) => {
  const cases = actions.map((actionName) => {
    const constantName = changeCase.constantCase(actionName);
    return `
      case ${constantName}:
        return state;
    `
  });

  return cases.join('');
}

const renderImports = (name, actions) => {
  const imports = actions
    .map(actionName => changeCase.constantCase(actionName))
    .join(',')

  return `
    import { 
      ${imports}
    } from './actions/${name}'  
  `
}


module.exports = createReducerCode;
