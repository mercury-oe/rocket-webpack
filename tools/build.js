const webpack = require('webpack');
const chalk = require('chalk');

const prodConfig = require('./webpack.prod');

const compiler = webpack(prodConfig());

compiler.run((error, stats) => {
  if (error) {
    console.error(error.stack || error);

    if (error.details) {
      console.error(error.details);
    }

    return null;
  }

  const info = stats.toString({
    colors: true,
    hash: true,
    version: true,
    timings: true,
    env: true,
    chunks: false,
    modules: false,
    children: false,
    publicPath: true,
    reasons: true,
    source: false,
  });

  console.log(chalk.greenBright('✓ Build completed.'));
  console.log(info);

  if (stats.hasErrors()) {
    console.log(chalk.redBright('→ Error!'));
    console.error(info);

    return null;
  }

  if (stats.hasWarnings()) {
    console.log(chalk.yellowBright('→ Warning!'));
    console.warn(info);

    return null;
  }

  return null;
});
