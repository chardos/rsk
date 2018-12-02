const decorateData = (obj) => {
  const { config: {style}} = obj;
  const reducerFolder = (style === 'ducks') ? 'ducks' : 'reducers';
  return {
    ...obj,
    reducerFolder
  }
};

module.exports = decorateData;
