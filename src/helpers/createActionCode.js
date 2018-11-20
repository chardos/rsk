const changeCase = require('change-case')

function createActionCode(name, actions) {
  const constantsCode = createConstants(actions);
  const actionsCode = actions.map(createAction);

  return `${constantsCode}  
${actionsCode.join('')}
`
}

const createConstants = (actions) => {
  const constants = actions.map((actionName) => {
    const constantName = changeCase.constantCase(actionName);
    return `export const ${constantName} = '${constantName}'
`
  });

  return constants.join('');
}


const createAction = (actionName) => {
  const variableName = changeCase.camelCase(actionName);
  const constantName = changeCase.constantCase(actionName);

  return `export const ${variableName} = () => {
  return {
    type: ${constantName}
  }
}

`
}



module.exports = createActionCode;