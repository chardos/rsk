exports.sfc = componentName => `
  import React from 'react';
  
  const ${componentName} = () => {
    return <div>${componentName}</div>;
  }
  
  export default ${componentName};
`;

exports.cc = componentName => `
  import React from 'react';

  class ${componentName} extends React.Component {
    render() { 
      return <div>${componentName}</div>;
    }
  }
  
  export default ${componentName};
`;
