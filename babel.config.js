const presets = [
  [
    '@babel/env',
    {
      targets: {
        browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
      },
      useBuiltIns: 'usage',
    },
  ],
];

const plugins = [
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-class-properties',
  [
    'babel-plugin-module-resolver',
    {
      root: ['./src'],
      alias: {
        '@': './src',
      },
    },
  ],
];

module.exports = { presets, plugins };
