const {
  doc: {
    builders: { hardline, join }
  }
} = require('prettier');

const {
  printComments,
  printSeparatedItem,
} = require('../common/printer-helpers');

const AssemblyBlock = {
  print: ({ node, options, path, print }) => [
    '{',
    printSeparatedItem(
      [
        join([',', hardline], path.map(print, 'operations')),
        printComments(node, path, options)
      ],
      { firstSeparator: hardline, lastSeparator: [',', hardline], grouped: false }
    ),
    '}'
  ]
};

module.exports = AssemblyBlock;
