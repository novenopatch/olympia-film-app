const path = require('path');

module.exports = {
  entry: './src/app.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
    // Règles de configuration des loaders
    // Par exemple, pour les fichiers JavaScript, vous pouvez utiliser Babel :
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    // Autres règles pour les fichiers CSS, images, etc.
  ],
},
resolve: {
  fallback: {
    fs: false,
    os: require.resolve('os-browserify/browser'),
    path: require.resolve('path-browserify'),
  },
},
// Autres configurations de plugins, résolution des modules, etc.
};

