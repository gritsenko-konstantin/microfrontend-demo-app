const path = require('path');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = () => {
    const mode = process.env.NODE_ENV || 'development';
    const remoteName = 'application1';
    const port = '3001';

    return {
        mode,
        entry: path.resolve(__dirname, 'src/index'),
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
                '@microfrontend-demo/design-system/components': path.resolve(__dirname, '../../../libs/design-system/components/src'),
                '@microfrontend-demo/design-system/styles': path.resolve(__dirname, '../../../libs/design-system/styles/src'),
                '@microfrontend-demo/tio/common': path.resolve(__dirname, '../../../libs/tio/common/src'),
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
        plugins: [
            new ModuleFederationPlugin({
                name: remoteName,
                library: { type: 'window', name: remoteName },
                filename: 'remoteEntry.js',
                exposes: {
                    '.': path.resolve(__dirname, 'src')
                },
                shared: [
                    'react',
                    'react-dom',
                    'styled-components'
                ]
              })
        ]
    };
};
