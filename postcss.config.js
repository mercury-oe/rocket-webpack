const importPlugin = require('postcss-import');
const extend = require('postcss-extend');
const nested = require('postcss-nested');
const autoprefixer = require('autoprefixer');
const flexbugsFixes = require('postcss-flexbugs-fixes');

module.exports = {
  plugins: [
    importPlugin,
    extend,
    nested,
    autoprefixer,
    flexbugsFixes,
  ],
};
