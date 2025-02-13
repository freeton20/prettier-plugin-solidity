const { printSeparatedList } = require('../common/printer-helpers');

const parameters = (node, path, print) =>
  node.parameters
    ? [
        node.kind || '',
        '(',
        printSeparatedList(path.map(print, 'parameters')),
        ') '
      ]
    : '';

const CatchClause = {
  print: ({ node, path, print }) => [
    'catch ',
    parameters(node, path, print),
    path.call(print, 'body')
  ]
};

module.exports = CatchClause;
