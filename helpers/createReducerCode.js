function createReducerCode(name) {
  return `
    function ${name}(state = initialState, action) {
      return state
    }
  `
}

module.exports = createReducerCode;