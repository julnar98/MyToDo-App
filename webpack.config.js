const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  chainWebpack: config => {
    config.plugin('eslint').use(ESLintPlugin, [
      {
        extensions: ['js', 'vue'],
      },
    ]);
  },
};
module.exports = {
    lintOnSave: false 
  }
  