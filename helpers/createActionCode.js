function createActionCode(name) {
  return `function addTodo(text) {
    return {
      type: ADD_TODO,
      text
    }
  }

module.exports = ${name}
`
}



module.exports = createActionCode;