const changeCase = require('change-case');
const { renderExportedConstant, renderSwitchStatement, renderActionCreator } = require('../redux');

const renderExportedConstants = actions => (
  actions
    .map(renderExportedConstant)
    .join('\n')
);

const renderFunctions = actions => (
  actions
    .map(renderActionCreator)
    .join('\n')
);


module.exports = function createDuckCode(name, actions) {
  const constants = renderExportedConstants(actions);
  const reducer = renderSwitchStatement(name, actions);
  const actionFunctions = renderFunctions(actions);

  return `
    ${constants}  
    ${reducer}
    ${actionFunctions}
  `;
};
