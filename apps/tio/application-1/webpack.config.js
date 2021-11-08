const path = require('path');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = () => {
    return {
        plugins: [
            new ModuleFederationPlugin({
                name: 'application1',
                library: { type: 'var', name: 'application1' },
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
            path: path.resolve(__dirname, '../dist/application-1')
        },
        devServer: {
            port: '3001',
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
    };
};
