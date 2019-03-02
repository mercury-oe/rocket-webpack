const importPlugin = require('postcss-import');
const extend = require('postcss-extend');
const nested = require('postcss-nested');
const hexrgba = require('postcss-hexrgba');
const autoprefixer = require('autoprefixer');
const flexbugsFixes = require('postcss-flexbugs-fixes');

module.exports = {
  plugins: [
    importPlugin,
    extend,
    nested,
    hexrgba,
    autoprefixer,
    flexbugsFixes,
  ],
};
