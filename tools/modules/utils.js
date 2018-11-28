const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;

const connectHotModuleReplacement = () => ({
  plugins: [ new HotModuleReplacementPlugin() ],
});

module.exports = {
  connectHotModuleReplacement,
};
