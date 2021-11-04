const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const baseConfig = require('../../../tools/webpack.config');

const PORT = '3004';

module.exports = {
    ...baseConfig(__dirname, PORT),
    plugins: [
        // New
        new ModuleFederationPlugin({
            name: 'design-system/styles',
            library: { type: 'window', name: 'design-system/styles' },
            filename: 'remoteEntry.js',
            exposes: {
              '.': './src/app',
            },
            shared: ['react', 'react-dom'],
          })
    ]
};