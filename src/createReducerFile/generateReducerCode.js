const { renderSwitchStatement, renderImports } = require('../helpers/generation')
const changeCase = require('change-case')

function createReducerCode(name, actions) {
  return `
    ${renderImports(name, actions)}
    ${renderSwitchStatement(name, actions)}
  `
}



module.exports = createReducerCode;
