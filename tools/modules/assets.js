const config = require('../config');

const fontsLoader = () => ({
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `fonts/${config.names.chunkNameAsset}`,
            },
          },
        ],
      },
    ],
  },
});

const imagesLoader = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `images/${config.names.chunkNameAsset}`,
            },
          },
        ],
      },
    ],
  },
});

const svgLoader = () => ({
  module: {
    rules: [
      {
        test: /\.svg$/,
        issuer: {
          test: /\.js$/,
        },
        use: [
          '@svgr/webpack',
          {
            loader: 'file-loader',
            options: {
              name: `images/${config.names.chunkNameAsset}`,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        issuer: {
          test: /\.css$/,
        },
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `images/${config.names.chunkNameAsset}`,
            },
          },
        ],
      },
    ],
  },
});

module.exports = {
  fontsLoader,
  imagesLoader,
  svgLoader,
};
