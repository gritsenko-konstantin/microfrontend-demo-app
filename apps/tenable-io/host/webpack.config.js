const path = require('path');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
    return {
        plugins: [
            new ModuleFederationPlugin({
                name: 'host',
                library: { type: 'var', name: 'host' },
                filename: 'remoteEntry.js',
                remotes: {
                    'application1': 'application1',
                    'application2': 'application2'
                },
                shared: [
                    'react',
                    'react-dom',
                    'styled-components'
                ]
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public/index.html'),
            })
        ],
        output: {
            path: path.resolve(__dirname, '../dist/host')
        },
        devServer: {
            port: '3000',
            client: {
                overlay: false,
            },
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        },
        mode: process.env.NODE_ENV || 'development',
        resolve: {
            extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
            alias: {
                '@microfrontend-demo/design-system/components': path.resolve(__dirname, '../../../libs/design-system/components/src'),
                '@microfrontend-demo/design-system/styles': path.resolve(__dirname, '../../../libs/design-system/styles/src'),
                '@microfrontend-demo/tenable-io/common': path.resolve(__dirname, '../../../libs/tenable-io/common/src'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: require.resolve('babel-loader'),
                    options: {
                        presets: [require.resolve('@babel/preset-react')],
                    },
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
    };
};
