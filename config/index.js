const path = require('path');

module.exports = {
  paths: {
    src: {
      base: path.resolve('src/'),
      js: path.resolve('src/'),
      css: path.resolve('src/css/'),
    },
    dist: {
      base: path.resolve('dist/'),
    },
    appHTML: path.resolve('src/assets/template/'),
  },
  entries: {
    main: path.resolve('src/index.js'),
  },
  devServerConfig: {},
};
