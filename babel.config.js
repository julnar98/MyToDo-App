module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset', // Vue CLI's default preset
    [
      '@babel/preset-env',
      {
        modules: false, // Don't transform ES6 modules
        targets: '> 0.25%, not dead', // Target modern browsers
      },
    ],
  ],
};
