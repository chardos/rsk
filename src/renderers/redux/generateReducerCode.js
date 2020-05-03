const { renderSwitchStatement, renderImports } = require('../redux');

function createReducerCode(name, actions) {
  return `
    ${renderImports(name, actions)}
    ${renderSwitchStatement(name, actions)}
  `;
}

module.exports = createReducerCode;
