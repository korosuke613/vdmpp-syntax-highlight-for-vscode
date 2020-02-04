# VDM++ IDE for Visual Studio Code

Smart linting and syntax highlighting(rough) for VDM++ in VSCode using the [VDM++ language server](https://github.com/korosuke613/vdmpp-language-server).

[![Version](https://img.shields.io/visual-studio-marketplace/v/korosuke613.vdmpp-extension)](https://marketplace.visualstudio.com/items?itemName=korosuke613.vdmpp-extension)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/korosuke613.vdmpp-extension)](https://marketplace.visualstudio.com/items?itemName=korosuke613.vdmpp-extension)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/korosuke613.vdmpp-extension)](https://marketplace.visualstudio.com/items?itemName=korosuke613.vdmpp-extension)

To use, open a VDM++ file(`*.vdmpp`).
The language server will then automatically launch in the background.

## Features

* Linting
* Syntax Highlighting(Rough)

**Future Works**

* [x] Linting
* [x] Syntax Highlighting(rough)
* [ ] Syntax Highlighting(detail)
* [ ] Formatting
* [ ] Document symbols
* [ ] Go-to-definition
* [ ] Code completion
* [ ] Hover
* [ ] Find references

### Linting

Lint the VDM++ file.

![Linting](https://github.com/korosuke613/vdmpp-vscode-extension/tree/master/images/sample-lint.png)

### Syntax Highlighting

Syntax highlight the VDM++ file.(using [VDMJ](https://github.com/nickbattle/vdmj))

![Syntax Highlighting](https://github.com/korosuke613/vdmpp-vscode-extension/tree/master/images/sample-syntax-highlight.png)

## Development

For the Developper.

### Packageing

```bash
vsce package
```

