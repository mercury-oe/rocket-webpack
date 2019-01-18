const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const waitpage = require('webpack-dev-server-waitpage');
const hot = require('webpack-hot-middleware');
const openBrowser = require('react-dev-utils/openBrowser');

const createDevConfig = require('../webpack.dev');
const config = require('../config');

(async () => {
  const devConfig = await createDevConfig();

  const {
    devServer: { host, port },
  } = devConfig;

  const compiler = webpack(devConfig);

  const devServer = new WebpackDevServer(compiler, {
    host,
    port,
    historyApiFallback: true,
    overlay: true,
    quiet: true,
    clientLogLevel: 'none',
    noInfo: true,
    contentBase: config.paths.src.templates,
    watchContentBase: true,
    hot: true,
    publicPath: config.paths.publicPath,
    before: (app, server) => {
      app.use(
        waitpage(server, {
          theme: 'dark',
        }),
      );
    },
    after: (app) => {
      app.use(
        hot(compiler, {
          log: false,
        }),
      );
    },
  });

  devServer.listen(port, host, () => {
    console.log(
      `${chalk.greenBright('→ Server listening on')} ${chalk.blueBright(
        `http://${host}:${port}`,
      )}`,
    );

    openBrowser(`http://${host}:${port}`);
  });
})();
