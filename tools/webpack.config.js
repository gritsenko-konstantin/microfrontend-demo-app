const path = require('path');
const crypto = require('crypto');

const glob = require('glob');
const { hashElement } = require('folder-hash');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const workspace = require('../workspace.json');
const package = require('../package.json');
const { getRemote, getRemotes } = require('./remote-management');

const allDependencies = { ...package.dependencies, ...package.devDependencies };

const mode = process.env.NODE_ENV || 'development';

/*
Example output:
    react: { singleton: true, requiredVersion: '17.0.2' }
*/
const getSharedNpmLibraries = () => {
    return Object.fromEntries(Array(
        'react',
        'react-dom',
        'styled-components',
        /*
        If you take out the following line and investigate your
        network traffic while toggling between Application 1 & 2,
        you will notice that a JS file looking like
        `node_modules_styled-system_theme-get...` gets loaded twice.
        This indicates the file is not being shared via federated modules.
        */
        '@styled-system/theme-get'
    ).map((lib) => {
        const singletons = ['react', 'react-dom', 'styled-components'];

        if (singletons.includes(lib)) {
            return [lib, {
                singleton: true,
                requiredVersion: allDependencies[lib]
            }]; 
        }

        return [lib, allDependencies[lib]];
    }));
};

/*
Example output:
    '@microfrontend-demo/design-system/components': {
        version: '6wDxWeZ+hG0Dp6wUHuipPqPzE10=',
        requiredVersion: '6wDxWeZ+hG0Dp6wUHuipPqPzE10='
    }
*/
const getSharedCustomLibraries = async () => {
    const workspaceLibs = Object.fromEntries(
        Object.entries(workspace.projects)
        .filter(({ 1:value }) => value.includes('libs/'))
        .map(({ 0:key, 1:value }) => [key, value])
    );
    const hashOptions = {
        folders: { exclude: ['.*', 'node_modules', '__tests__'] },
        files: { include: ['*.js', '*.json', '*.ts', '*.tsx'] }
    };

    const libs = await Promise.all(
        Object.entries(workspaceLibs).map(async ({ 0:key, 1:value }) => {
            const libPath = path.resolve(__dirname, '..', value, 'src');
            const hashInfo = await hashElement(libPath, hashOptions);
            const versionBasedOffHash = hashInfo.hash;
    
            return [`@microfrontend-demo/${key}`, {
                version: versionBasedOffHash,
                requiredVersion: versionBasedOffHash
            }];
        })
    );

    return Object.fromEntries(libs);
};

const getFederatedPlugin = async (remoteName) => {
    const customSharedLibs = await getSharedCustomLibraries();
    const sharedLibs = Object.assign(getSharedNpmLibraries(), customSharedLibs);

    if (remoteName === 'host') {
        return [
            new ModuleFederationPlugin({
                name: 'host',
                library: { type: 'window', name: 'host' },
                filename: 'remoteEntry.js',
                remotes: {
                    'application-1': 'application-1',
                    'application-2': 'application-2',
                    'design-system/components': 'design-system/components',
                    'design-system/styles': 'design-system/styles',
                    'tio/common': 'tio/common',
                },
                shared: sharedLibs
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'index.html'),
            }),
            new DefinePlugin({
                REMOTE_INFO: JSON.stringify(getRemotes())
            })
        ];
    }

    return [
        new ModuleFederationPlugin({
            name: remoteName,
            library: { type: 'window', name: remoteName },
            filename: 'remoteEntry.js',
            exposes: {
              '.': path.resolve(__dirname, `../apps/tio/${remoteName}/src`)
            },
            shared: sharedLibs
          })
    ];
};

const baseConfig = async (directory) => {
    // const package = require(path.resolve(directory, 'package.json'));
    const remoteName = process.env.name; // package.name;
    const port = Object.values(getRemote(remoteName))[0];
    const plugins = await getFederatedPlugin(remoteName);

    return {
        mode,
        entry: path.resolve(__dirname, `../apps/tio/${remoteName}/src/index`),
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
        plugins
    };
};

module.exports = baseConfig;