module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            // app config
            "@assets": "./src/assets",
            "@constants": "./src/constants",
            "@theme": "./src/theme",
            // building blocks
            "@api": "./src/api",
            "@components": "./src/components",
            "@context": "./src/context",
            "@copy": "./src/copy",
            "@hocs": "./src/hocs",
            "@hooks": "./src/hooks",
            "@scenes": "./src/scenes",
            "@utils": "./src/utils",
            "@navigators": "./src/navigators",
            "@screens": "./src/screens"
          },
        },
      ],
      [
        "module:react-native-dotenv", 
        {
          "moduleName": "@env",
          "path": ".env",
          "blacklist": null,
          "whitelist": null,
          "safe": false,
          "allowUndefined": true
        }
      ]
    ]
  };
};
