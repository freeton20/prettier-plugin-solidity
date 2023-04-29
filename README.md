# prettier-plugin-tvmsolidity

<p align="center">
  <a href="https://github.com/venom-blockchain/developer-program">
    <img src="https://raw.githubusercontent.com/venom-blockchain/developer-program/main/vf-dev-program.png" alt="Logo" width="366.8" height="146.4">
  </a>
</p>

---

**NOTE**

This is the fork of the Ethereum-solidity plugin for prettier. This plugin works with Everscale Solidity (or ton-solidity). Works with `.sol` and `.tsol` files. It's not compatible with Ethereum Solidity.

---

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/prettier-plugin-tvmsolidity.svg)](https://badge.fury.io/js/prettier-plugin-tvmsolidity) [![Telegram](/assets/telegram-badge.svg)](https://t.me/tonsolidity)

<p align="center">
  <img width="375" height="375" src="https://user-images.githubusercontent.com/26024499/161311294-fcd187b2-0366-418d-a89b-96848e6adb15.png">
</p>

A [Prettier plugin](https://prettier.io/docs/en/plugins.html) for automatically formatting your [Everscale Solidity](https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/API.md) code.

## Installation and usage

### Using in NodeJS

Install both `prettier` and `prettier-plugin-solidity`:

```Bash
npm install --save-dev prettier prettier-plugin-tvmsolidity
```

Run prettier in your contracts:

1. Format all contracts

```Bash
npx prettier --write 'contracts/**/*.{tsol,sol}'
```

2. Format concrete contract

```Bash
npx prettier --write 'fileName.{tsol,sol}'
```

You can add a script to your package.json for running prettier on all your contracts:

```Bash
"scripts": {
   "format": "prettier --write 'contracts/**/*.{tsol,sol}'"
  }
```

You can add a script to your package.json for running prettier on all your contracts:

```Bash
"lint": "prettier --list-different 'contracts/**/*.{tsol,sol}'"
```

> Prettier Solidity only works with valid code. If there is a syntax error, nothing will be done and a parser error will be thrown.

### Using in the Browser

_Added in v1.1.0_

To use this package in the browser, you need to load Prettier's standalone bundle before loading the build provided in this package.

```html
<script src="https://unpkg.com/prettier@latest"></script>
<script src="https://unpkg.com/prettier-plugin-solidity@latest"></script>
```

Prettier's unpkg field points to `https://unpkg.com/prettier/standalone.js`, in a similar way this plugin points to `https://unpkg.com/prettier-plugin-solidity/dist/standalone.js`.

Once the scripts are loaded you will have access the globals `prettier` and `prettierPlugins`.

We follow Prettier's strategy for populating their plugins in the object `prettierPlugins`, you can load other plugins like `https://unpkg.com/prettier@2.8.0/parser-markdown.js` and Prettier will have access to multiple parsers.

```html
<script>
  const originalCode = 'contract Foo {}';
  const formattedCode = prettier.format(originalCode, {
    parser: 'solidity-parse',
    plugins: prettierPlugins
  });
</script>
```

For more details and please have a look at [Prettier's documentation](https://prettier.io/docs/en/browser.html).

## Configuration File

Prettier provides a flexible system to configure the formatting rules of a project. For more information please refer to the [documentation](https://prettier.io/docs/en/configuration.html).
The following is the default configuration internally used by this plugin.

```JSON
{
  "overrides": [
    {
      "files": "*.{tsol,sol}",
      "options": {
        "printWidth": 80,
        "useTabs": true,
        "singleQuote": false,
        "bracketSpacing": false,
      }
    }
  ]
}
```

Note the use of the [overrides property](https://prettier.io/docs/en/configuration.html#configuration-overrides) which allows for multiple configurations in case there are other languages in the project (i.e. JavaScript, JSON, Markdown).

Most options are described in Prettier's [documentation](https://prettier.io/docs/en/options.html).

- `"always"`: Prefer explicit types (`uint256`, `int256`, etc.)
- `"never"`: Prefer type aliases (`uint`, `int`, etc.).
- `"preserve"`: Respect the type used by the developer.

| Default    | CLI Override                                 | API Override                                 |
| ---------- | -------------------------------------------- | -------------------------------------------- |
| `"always"` | `--explicit-types <always\|never\|preserve>` | `explicitTypes: "<always\|never\|preserve>"` |

```Solidity
// Input
uint public a;
int256 public b;

// "explicitTypes": "always"
uint256 public a;
int256 public b;

// "explicitTypes": "never"
uint public a;
int public b;

// "explicitTypes": "preserve"
uint public a;
int256 public b;
```

Note: switching between `uint` and `uint256` does not alter the bytecode at all and we have implemented tests for this. However, there will be a change in the AST reflecting the switch.

## Integrations

### VSCode

VSCode is not familiar with the Everscale Solidity language, so [`Everscale solidity support`](https://marketplace.visualstudio.com/items?itemName=everscale.solidity-support) needs to be installed.

```Bash
code --install-extension everscale.solidity-support
```

You can format a file with the context menu:

<img src="https://user-images.githubusercontent.com/26024499/161323920-02d2b6a1-59a7-431e-9ccd-7fdf33cb36a4.gif">

This extension provides basic integration with Prettier for most cases no further action is needed.

Make sure your editor has format on save set to true.
When you save VSCode will ask you what formatter would you like to use for the solidity language, you can choose `everscale.solidity-support`.

At this point VSCode's `settings.json` should have a configuration similar to this:

```JSON
{
  "solidity.formatter": "prettier", // This is the default so it might be missing.
  "[ton-solidity]": {
    "editor.defaultFormatter": "everscale.solidity-support"
  },
}
```

If you want more control over other details, you should proceed to install [`prettier-vscode`](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

```Bash
code --install-extension esbenp.prettier-vscode
```

To interact with 3rd party plugins, `prettier-vscode` will look in the project's npm modules, so you'll need to have `prettier` and `prettier-plugin-solidity` in your `package.json`

```Bash
npm install --save-dev prettier prettier-plugin-solidity
```

This will allow you to specify the version of the plugin in case you want to use the latest version of the plugin or need to freeze the formatting since new versions of this plugin will implement tweaks on the possible formats.

Note: By design, Prettier prioritizes a local over a global configuration. If you have a `.prettierrc` file in your project, your VSCode's default settings or rules in `settings.json` are ignored ([prettier/prettier-vscode#1079](https://github.com/prettier/prettier-vscode/issues/1079)).

### Pnpm

There's a [known bug](https://github.com/pnpm/pnpm/issues/4700) in Pnpm v7 that prevents Prettier plugins from working out of the box. To make Prettier Solidity work in your project, you have to add the following settings in your `.prettierrc.` file:

```json
{
  "plugins": "prettier-plugin-solidity",
  "overrides": [
    {
      "files": "*.{tsol,sol}", 
      "options": {
        "parser": "solidity-parse"
      }
    }
  ]
}
```

Then, if you are using VSCode, you also need to add this to your VSCode settings:

```json
{
  "prettier.documentSelectors": ["**/*.{tsol,sol}"]
}
```

## Edge cases

Prettier Solidity does its best to be pretty and consistent, but in some cases it falls back to doing things that are less than ideal.

### Modifiers in constructors

Modifiers with no arguments are formatted with their parentheses removed, except for constructors. The reason for this is that Prettier Solidity cannot always tell apart a modifier from a base constructor. So modifiers in constructors are not modified. For example, this:

```Solidity
contract Foo is Bar {
  constructor() Bar() modifier1 modifier2() modifier3(42) {}

  function f() modifier1 modifier2() modifier3(42) {}
}
```

will be formatted as

```Solidity
contract Foo is Bar {
  constructor() Bar() modifier1 modifier2() modifier3(42) {}

  function f() modifier1 modifier2 modifier3(42) {}
}
```

Notice that the unnecessary parentheses in `modifier2` were removed in the function but not in the constructor.

## Contributing

This fork is based on two others:

- <a href="https://github.com/pizza-777/parser/tree/ton-solidity-module">Parser</a>

- <a href="https://github.com/pizza-777/antlr/tree/ton-solidity">ANTLR Grammar</a>

## License

Distributed under the MIT license. See [LICENSE](LICENSE) for more information.
