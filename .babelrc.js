module.exports = {
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ],
  presets: [['@babel/preset-env', { targets: { node: 10 } }], '@babel/preset-typescript']
};
