const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const mode = process.env.NODE_ENV || 'development';

const getFederatedPlugin = (directory, remoteName) => {
    if (remoteName === 'host') {
        return [
            new ModuleFederationPlugin({
                name: 'host',
                library: { type: 'window', name: 'host' },
                filename: 'remoteEntry.js',
                remotes: {
                    'application1': 'application1',
                    'application2': 'application2',
                    'design-system/components': 'design-system/components',
                    'design-system/styles': 'design-system/styles',
                    'tio/common': 'tio/common',
                },
                shared: ['react', 'react-dom', 'styled-components'],
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(directory, 'public/index.html'),
            })
        ];
    }

    return [
        new ModuleFederationPlugin({
            name: remoteName,
            library: { type: 'window', name: remoteName },
            filename: 'remoteEntry.js',
            exposes: {
              '.': path.resolve(directory, 'src/app.jsx'),
            },
            shared: ['react', 'react-dom', 'styled-components'],
          })
    ];
};

const baseConfig = (directory, port, remoteName) => {
    return {
        mode,
        entry: path.resolve(directory, './src/index'),
        output: {
            publicPath: `http://localhost:${port}/`,
        },
        devtool: 'source-map',
        optimization: {
            minimize: mode === 'production',
        },
        resolve: {
            extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
            alias: {
                '@microfrontend-demo/design-system/components': path.resolve(__dirname, '../libs/design-system/components/src'),
                '@microfrontend-demo/design-system/styles': path.resolve(__dirname, '../libs/design-system/styles/src'),
                '@microfrontend-demo/tio/common': path.resolve(__dirname, '../libs/tio/common/src'),
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
        devServer: {
            port,
            client: {
                overlay: false,
            },
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        },
        plugins: getFederatedPlugin(directory, remoteName)
    };
};

module.exports = baseConfig;