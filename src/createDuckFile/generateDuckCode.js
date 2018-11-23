const changeCase = require('change-case');
const { renderSwitchStatement } = require('../renderers/redux');

const renderConstants = actions => (
  actions
    .map((actionName) => {
      const constantName = changeCase.constantCase(actionName);
      return `export const ${constantName} = '${constantName}'`;
    })
    .join('\n')
);

const renderFunctions = actions => (
  actions
    .map((actionName) => {
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
    .join('\n')
);

module.exports = function createDuckCode(name, actions) {
  const constants = renderConstants(actions);
  const reducer = renderSwitchStatement(name, actions);
  const actionFunctions = renderFunctions(actions);

  return `
    ${constants}  
    ${reducer}
    ${actionFunctions}
  `;
};
