# React Scaffold Kit

[![npm version](https://img.shields.io/npm/v/rsk.svg?style=flat)](https://www.npmjs.com/package/rsk)

A CLI tool for scaffolding react and redux applications

## Installation

`npm install -g rsk`

## Using it


#### React Stateless Component

```
rsk sfc <component name>
```

#### React Class Component

```
rsk cc <component name>
```

#### Creating connected redux components

```
Coming soon:
rsk sfc <component name> --actions <actions> --reducers <reducers>
```

#### Redux

Setting up the store

```
rsk setup-store
```

Adding a reducer

```
rsk reducer <reducer name> <any number of action names>
```

## Connecting a component

```
rsk connect <component name> <...reducer names>
```

Example:

```
rsk connect Sports volleyball soccer 
```
Turns this:

```
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

```
module.exports = {
  style: 'ducks',
  codeDirectory: 'src',
  componentsDirectory: 'components'
}
```
