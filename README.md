# React Scaffold Kit

A CLI tool for scaffolding react and redux applications

## Installation

`npm i -g rsk`

## Using it


#### React Stateless Component

```
rsk sfc <component name>
```

#### React Class Component

```
rsk cc <component name>
```

#### Redux

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

