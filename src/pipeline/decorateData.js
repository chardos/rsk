const decorateData = (obj) => {
  const { config: {style}} = obj;
  const reducerFolder = (style === 'ducks') ? 'ducks' : 'reducers';
  if (style === 'ducks') {
    return {
      ...obj,
      reducerFolder
    }
  }
};

module.exports = decorateData;
