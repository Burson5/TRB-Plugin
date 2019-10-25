const path = require('path');

const rootDir = path.resolve(__dirname, '../../');

module.exports = {
  root: rootDir,
  lib: path.resolve(rootDir, './lib'),
  src: path.resolve(rootDir, './src'),
  pages: path.resolve(rootDir, './src/pages'),
  background: path.resolve(rootDir, './src/pages/background'),
  content: path.resolve(rootDir, './src/pages/content'),
  popup: path.resolve(rootDir, './src/pages/popup'),
  dist: path.resolve(rootDir, './dist'),
  modules: path.resolve(rootDir, './node_modules')
};
