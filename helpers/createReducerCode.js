const changeCase = require('change-case')

function createReducerCode(name, actions) {
  return `function ${name}(state = {}, action) {
  switch (action.type) {
${createCases(actions)}
     default:
       return state;
  }
}

export default ${name}
`
}

const createCases = (actions) => {
  const cases = actions.map((actionName) => {
    const constantName = changeCase.constantCase(actionName);
    return `    case ${constantName}:
      return state;
`
  });

  return cases.join('');
}



module.exports = createReducerCode;


function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}