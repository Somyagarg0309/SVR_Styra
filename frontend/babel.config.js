module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',   // the import path in your code
          path: '.env',         // path to your .env file
          safe: false,          // set to true if you have a .env.example file
          allowUndefined: true, // allows undefined env vars
        },
      ],
    ],
  };
};
