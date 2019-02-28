const webpack = require('webpack');
const chalk = require('chalk');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

const prodConfig = require('../webpack.prod');
const config = require('../config');

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;

function build(previousFileSizes) {
  console.log('Creating an optimized production build...');

  const compiler = webpack(prodConfig());

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI
        && (typeof process.env.CI !== 'string'
          || process.env.CI.toLowerCase() !== 'false')
        && messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n'
            + 'Most CI servers set it automatically.\n',
          ),
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
}

measureFileSizesBeforeBuild(config.paths.dist.base)
  .then(previousFileSizes => build(previousFileSizes))
  .then(({ stats, warnings }) => {
    if (warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n'));
      console.log(warnings.join('\n\n'));
      console.log(
        `\nSearch for the ${
          chalk.underline(chalk.yellow('keywords'))
        } to learn more about each warning.`,
      );
      console.log(
        `To ignore, add ${
          chalk.cyan('// eslint-disable-next-line')
        } to the line before.\n`,
      );
    } else {
      console.log(chalk.green('Compiled successfully.\n'));
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
    console.log(info);
  });
