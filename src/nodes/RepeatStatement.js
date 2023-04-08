const { printSeparatedItem } = require('../common/printer-helpers');

const RepeatStatement = {
  print: ({ path, print }) => [
    'repeat (',
    printSeparatedItem(path.call(print, 'condition')),
    ')',
    [' ', path.call(print, 'body')]
  ]
};

module.exports = RepeatStatement;
