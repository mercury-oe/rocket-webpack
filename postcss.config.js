const importPlugin = require('postcss-import');
const extend = require('postcss-extend');
const reporter = require('postcss-reporter');
const simpleVars = require('postcss-simple-vars');
const nestedAncestors = require('postcss-nested-ancestors');
const nested = require('postcss-nested');
const hexrgba = require('postcss-hexrgba');
const autoprefixer = require('autoprefixer');
const flexbugsFixes = require('postcss-flexbugs-fixes');

module.exports = {
  plugins: [
    importPlugin,
    extend,
    reporter,
    simpleVars,
    nestedAncestors,
    nested,
    hexrgba,
    autoprefixer,
    flexbugsFixes,
  ],
};
