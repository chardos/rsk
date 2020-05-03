const changeCase = require("change-case");

function generateActionCode(name, actions) {
  const constants = renderConstants(actions);
  const functions = renderActionCreators(actions);

  return `
    ${constants}  
    ${functions}
  `;
}

const renderConstants = actions =>
  actions
    .map(actionName => {
      const constantName = changeCase.constantCase(actionName);
      return `export const ${constantName} = '${constantName}'`;
    })
    .join("\n");

const renderActionCreators = actions =>
  actions
    .map(actionName => {
      const variableName = changeCase.camelCase(actionName);
      const constantName = changeCase.constantCase(actionName);

      return `
        export const ${variableName} = () => {
          return {
            type: ${constantName}
          }
        }
      `;
    })
    .join("\n");

module.exports = generateActionCode;
