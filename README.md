# React Scaffold Kit

[![npm version](https://img.shields.io/npm/v/rsk.svg?style=flat)](https://www.npmjs.com/package/rsk)

A CLI tool for scaffolding react and redux applications.

## Installation

```
npm install -g rsk
```

## Notes

All command line arguments can use any type of casing. The following are all equivalent, and will result in a component called `ExampleComponent`.

- `rsk sfc ExampleComponent`

- `rsk sfc example-component`

- `rsk sfc exampleComponent`

## React commands

### React Stateless Component

```
rsk sfc <component name>
```

### React Class Component

```
rsk cc <component name>
```

## Redux commands

### Setting up the store

```
rsk setup-store
```

### Adding a reducer

```
rsk reducer <reducer name> <...reducernames>
```

Example:

```
rsk reducer volleyball add-score remove-score
```

Results in:

*actions/volleyball.js*
```js
export const ADD_SCORE = "ADD_SCORE";
export const REMOVE_SCORE = "REMOVE_SCORE";

export const addScore = () => {
  return {
    type: ADD_SCORE
  };
};

export const removeScore = () => {
  return {
    type: REMOVE_SCORE
  };
};
```

*reducers/volleyball.js*
```js
import { ADD_SCORE, REMOVE_SCORE } from "../actions/volleyball";

export default function volleyball(state = {}, action) {
  switch (action.type) {
    case ADD_SCORE:
      return state;

    case REMOVE_SCORE:
      return state;

    default:
      return state;
  }
}
```

### Connecting a component

```
rsk connect <component name> <...reducernames>
```

Example:

```
rsk connect Sports volleyball soccer
```
Turns this:

```js
import React from "react";

const Sports = (props) => {
  return <div>Sports</div>;
};

export default Sports;
```

Into this:

```diff
  import React from "react";
+ import { connect } from "react-redux";
  
  const Sports = (props) => {
    return <div>Sports</div>;
  };

+ const mapStateToProps = ({ volleyball, soccer }) => ({
+   volleyball,
+   soccer
+ });

- export default Sports;
+ export default connect(mapStateToProps)(Sports);
```

## Config

React Scaffold Kit can be configured using a `.rsk.js` file. Just add it to your root folder.

```js
module.exports = {
  style: 'ducks',
  codeDirectory: 'src',
  componentsDirectory: 'components',
  template: {
    sfc: (componentName) => `
      import React from 'react';
      
      const ${componentName} = () => {
        return <div>Some random text</div>;
      }
      
      export default ${componentName};
    `,
    cc: (componentName) => `
      import React from 'react';

      class ${componentName} extends React.Component {
        render() { 
          return <div>Some random text</div>
        }
      }
      
      export default ${componentName};
    `
  }
}
```
