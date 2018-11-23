const changeCase = require('change-case');

exports.sfc = name => `
    const ${name} = () => {
      return <div>${name}</div>;
    }
    
    export default ${name};
  `;

exports.cc = name => `
    import React from 'react';

    class ${name} extends React.Component {
      render() { 
        return <div>${name}</div>;
      }
    }
    
    export default ${name};
  `;
