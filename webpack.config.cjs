const path = require('path');

module.exports = {
  "mode": "none",
  "entry": "./client/src/main.js",
  "output": {
    "path": __dirname + '/dist',
    "filename": "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
}