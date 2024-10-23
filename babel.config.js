module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "nativewind/babel",
      [
        'module-resolver',
        {
          root: ['./'], // Das Root-Verzeichnis des Projekts
          alias: {
            components: './components',
            assets: './assets',
          },
        },
      ],
    ],
  };
};
