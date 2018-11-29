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

```
rsk reducer <reducer name> <any number of action names>
```

## Config

React Scaffold Kit can be configured using a `.rsk` file. Just add it to your root folder.

```
{
  "style": "ducks",
  "codeDirectory": "src",
  "componentsDirectory": "components"
}
```

