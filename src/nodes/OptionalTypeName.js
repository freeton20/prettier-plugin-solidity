const {
  doc: {
    builders: { group, softline }
  }
} = require('prettier');
const { printSeparatedList } = require('../common/printer-helpers');

const OptionalTypeName = {
  print: ({ path, print }) =>
    group([
      'optional(',
      printSeparatedList(path.map(print, 'arguments'), {
        separator: [', ', softline]
      }),
      ')'
    ])
};

module.exports = OptionalTypeName;