const path = require('path');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = () => {
    return {
        plugins: [
            new ModuleFederationPlugin({
                name: 'application2',
                library: { type: 'var', name: 'application2' },
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
        ],
        output: {
            path: path.resolve(__dirname, '../dist/application-2')
        },
        devServer: {
            port: '3002',
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
