const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const baseConfig = require('../../../tools/webpack.config');

const PORT = '3003';

module.exports = {
    ...baseConfig(__dirname, PORT),
    plugins: [
        // New
        new ModuleFederationPlugin({
            name: 'design-system/components',
            library: { type: 'window', name: 'design-system/components' },
            filename: 'remoteEntry.js',
            exposes: {
              '.': './src/app',
            },
            shared: ['react', 'react-dom'],
          })
    ]
};