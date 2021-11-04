const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const baseConfig = require('../../../../tools/webpack.config');

const PORT = '3001';

module.exports = {
    ...baseConfig(__dirname, PORT),
    plugins: [
        new ModuleFederationPlugin({
            name: 'application1',
            library: { type: 'window', name: 'application1' },
            filename: 'remoteEntry.js',
            exposes: {
              '.': './src/app',
            },
            shared: ['react', 'react-dom'],
          })
    ]
};