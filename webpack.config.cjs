const path = require('path');

module.exports = {
  "mode": "none",
  "entry": "./client/src/main.js",
  "output": {
    "path": __dirname + '/client/dist',
    "filename": "main.js"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
}