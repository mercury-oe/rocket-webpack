module.exports = api => {
  api.cache.never();

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
  ];

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          spec: true, // медленней, более строго
          loose: false, // быстрей, менее строго
          debug: false,
          modules: false, // default = commonjs
          useBuiltIns: 'entry',
          targets: [
            'last 2 versions',
            'Firefox ESR',
            'ie 10'
          ]
        },
      ],
    ],
    plugins,
  };
};

