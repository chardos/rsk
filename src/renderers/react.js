const changeCase = require('change-case')

exports.renderSfc = (name) => {
  return `
    const ${name} = () => {
      return <div>${name}</div>;
    }
    
    export default ${name};
  `
}
