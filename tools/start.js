const webpack = require('webpack');
const devServer = require('webpack-dev-server');
const hot = require('webpack-hot-middleware');
const chalk = require('chalk');
const openBrowser = require('react-dev-utils/openBrowser');
const waitpage = require('webpack-dev-server-waitpage');

const devConfig = require('./webpack.dev');

(async () => {
  const config = await devConfig();

  const {
    devServer: { host, port },
  } = config;

  const compiler = webpack(config);
  const server = new devServer(compiler, {
    host,
    port,
    historyApiFallback: true,
    overlay: true,
    quiet: true,
    clientLogLevel: 'none',
    noInfo: true,
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

  server.listen(port, host, () => {
    console.log(
      `${chalk.greenBright('→ Server listening on')} ${chalk.blueBright(
        `http://${host}:${port}`,
      )}`,
    );

    openBrowser(`http://${host}:${port}`);
  });
})();
