const {
  doc: {
    builders: { group, indent, line }
  },
  util: { getNextNonSpaceNonCommentCharacterIndex }
} = require('prettier');

const {
  printComments,
  printSeparatedItem,
  printSeparatedList
} = require('../common/printer-helpers');

const functionName = (node) => node.name ? `function ${node.name}` : '';

const parameters = (parametersType, node, path, print, options) => {
  if (node[parametersType] && node[parametersType].length > 0) {
    return printSeparatedList(path.map(print, parametersType), {
      grouped: false
    });
  }
  if (node.comments && node.comments.length > 0) {
    // we add a check to see if the comment is inside the parentheses
    const parameterComments = printComments(
      node,
      path,
      options,
      (comment) =>
        options.originalText.charAt(
          getNextNonSpaceNonCommentCharacterIndex(
            options.originalText,
            comment,
            options.locEnd
          )
        ) === ')'
    );
    return parameterComments.length > 0
      ? printSeparatedItem(parameterComments)
      : '';
  }
  return '';
};


const stateMutability = (node) =>
  node.stateMutability ? [line, node.stateMutability] : '';

const returnParameters = (node, path, print, options) =>
  node.returnParameters
    ? [
      line,
      'returns (',
      group(parameters('returnParameters', node, path, print, options)),
      ')'
    ]
    : '';

function body(node, path, print) {
  return (node.body ? path.call(print, 'body') : '');
}

const AssemblyFunctionDefinition = {
  print: ({ node, path, print, options }) => [
    group([
      functionName(node, options),
      '(',
      parameters('parameters', node, path, print, options),
      ')',
      indent(
        group([
          line,
          'assembly',
          printComments(node, path, options),
          stateMutability(node),
          returnParameters(node, path, print, options),
        ])
      )
    ]),
    body(node, path, print)
  ]
};

module.exports = AssemblyFunctionDefinition;