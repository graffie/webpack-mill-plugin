## Webpack mill plugin

This plugin is built for [Mill blog](https://graffie.github.io/mill/#/).


## Installation

```sh
$ npm install webpack-mill-plugin
```

## Usage

```JavaScript
var MillPlugin = require('webpack-mill-plugin');

module.exports = {
  plugins: [
    new MillPlugin('basic'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      __DEVTOOLS__: false,
    })
  ]
};
```

### Options

__name__

Define the a name for your theme, this option is required.

__prefix__

Define the prefex for the modules, default is __*themes*__.

## LICENSE 

[LICENSE](LICENSE)
