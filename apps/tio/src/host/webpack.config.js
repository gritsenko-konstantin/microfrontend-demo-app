const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const baseConfig = require('../../../../tools/webpack.config');

const PORT = '3000';

module.exports = {
    ...baseConfig(__dirname, PORT),
    plugins: [
        new ModuleFederationPlugin({
            name: 'host',
            library: { type: 'window', name: 'host' },
            filename: 'remoteEntry.js',
            remotes: {
                'application1': 'application1',
                'application2': 'application2',
                'tio/common': 'tio/common',
            },
            shared: ['react', 'react-dom'],
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ]
};