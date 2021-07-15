const path = require('path');

module.exports = {
  entry: './src/UnderCensorship.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};