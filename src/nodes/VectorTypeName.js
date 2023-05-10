const {
  doc: {
    builders: { group, softline }
  }
} = require('prettier');
const { printSeparatedList } = require('../common/printer-helpers');

const VectorTypeName = {
  print: ({ path, print }) =>
    group([
      'vector(',
      printSeparatedList(path.map(print, 'arguments'), {
        separator: [', ', softline]
      }),
      ')'
    ])
};

module.exports = VectorTypeName;
