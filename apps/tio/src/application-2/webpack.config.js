const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const baseConfig = require('../../../../tools/webpack.config');

const PORT = '3002';

module.exports = {
    ...baseConfig(__dirname, PORT),
    plugins: [
        new ModuleFederationPlugin({
            name: 'application2',
            library: { type: 'window', name: 'application2' },
            filename: 'remoteEntry.js',
            exposes: {
              '.': './src/app',
            },
            shared: ['react', 'react-dom'],
          })
    ]
};