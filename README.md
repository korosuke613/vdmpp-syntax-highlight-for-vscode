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


### Syntax Highlighting

Syntax highlight the VDM++ file.

![Syntax Highlighting](https://raw.githubusercontent.com/korosuke613/vdmpp-vscode-extension/master/images/sample-syntax-highlight.png)

### Linting

Lint the VDM++ file.(using [VDMJ](https://github.com/nickbattle/vdmj))

![Linting](https://raw.githubusercontent.com/korosuke613/vdmpp-vscode-extension/master/images/sample-lint.png)

## Development

For the Developper.

### Structure

![Structure](https://raw.githubusercontent.com/korosuke613/vdmpp-vscode-extension/master/images/vdmpp_extension_structure.png)

[Image file is here.](https://sketch.cloud/s/z3zga)

### Seaquence diagram

#### Activate extension

![activate extension](https://raw.githubusercontent.com/korosuke613/vdmpp-vscode-extension/master/images/activate_extension_sequence.png)

### Packageing

```bash
vsce package
```
