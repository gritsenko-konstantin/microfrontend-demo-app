const path = require('path');

const mode = process.env.NODE_ENV || 'production';

const baseConfig = (directory, port) => {
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
            ],
        },
        devServer: {
            port,
            client: {
                overlay: false,
            }
        }
    };
};

module.exports = baseConfig;