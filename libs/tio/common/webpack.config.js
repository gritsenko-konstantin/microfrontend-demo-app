const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const baseConfig = require('../../../tools/webpack.config');

const PORT = '3003';

module.exports = {
    ...baseConfig(__dirname, PORT),
    plugins: [
        // New
        new ModuleFederationPlugin({
            name: 'tio/common',
            library: { type: 'window', name: 'tio/common' },
            filename: 'remoteEntry.js',
            exposes: {
              '.': './src/app',
            },
            shared: ['react', 'react-dom'],
          })
    ]
};