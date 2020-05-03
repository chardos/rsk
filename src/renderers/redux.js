const changeCase = require("change-case");
const t = require("@babel/types");

exports.renderSwitchStatement = (name, actions) => `
  export default function ${name}(state = {}, action) {
    switch (action.type) {
      ${renderCases(actions)}
      default:
        return state;
    }
  }
`;

exports.renderImports = (name, actions) => {
  const imports = actions
    .map(actionName => changeCase.constantCase(actionName))
    .join(",");

  return `
    import { 
      ${imports}
    } from '../actions/${name}'  
  `;
};

exports.renderExportedConstant = actionName => {
  const constantName = changeCase.constantCase(actionName);
  return `export const ${constantName} = '${constantName}'`;
};

exports.makeImportSpecifier = actionName => {
  const identifier = t.identifier(changeCase.constantCase(actionName));
  return t.importSpecifier(identifier, identifier);
};

exports.renderActionCreator = actionName => {
  const variableName = changeCase.camelCase(actionName);
  const constantName = changeCase.constantCase(actionName);

  return `
    export const ${variableName} = () => {
      return {
        type: ${constantName}
      }
    }
  `;
};

exports.renderConnectedDefaultExport = ({ componentName, reducerNames }) => {
  const reducersJoined = reducerNames.join(",");
  return `
    const mapStateToProps = ({${reducersJoined}}) => ({${reducersJoined}})

    export default connect(mapStateToProps)(${componentName})
  `;
};

const renderCases = actions => {
  const cases = actions.map(renderCase);
  return cases.join("");
};

const renderCase = actionName => {
  const constantName = changeCase.constantCase(actionName);
  return `
    case ${constantName}:
      return state;
  `;
};

const generateCaseObject = actionName =>
  t.switchCase(t.identifier(changeCase.constantCase(actionName)), [
    t.returnStatement(t.identifier("state"))
  ]);

exports.generateCaseObject = generateCaseObject;
exports.renderCases = renderCases;
