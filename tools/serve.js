const path = require('path');
const os = require('os');
const spawn = require('cross-spawn');
const opn = require('opn');
const { argv } = require('yargs');

let numberOfAppsReady = 0;

const serveApp = (app, numberOfAppsToServe) => {
    const webpackConfig = 'webpack.config.js';
    const webpackArgs = ['webpack-dev-server', `--config=${path.join(__dirname, webpackConfig)}`];
    const stdio = ['pipe', 'pipe', 'pipe'];
    
    // If this is not a Windows machine, add ipc
    if (os.platform() !== 'win32') {
        stdio.push('ipc');
    }

    const wds = spawn('npx', webpackArgs, {
        stdio,
        env: {
            name: app,
            NODE_ENV: 'development',
            PATH: process.env.PATH
        }
    });

    wds.stdout.on('data', data => {
        console.log(`${data}`);
    });

    wds.stderr.on('data', data => {
        console.log(`${data}`);
    });

    wds.on('error', err => {
        console.log(`Failed to start webpack dev server: ${err}`);
    });

    wds.on('message', message => {
        message === 'ready' && numberOfAppsReady++;

        const readyForLiftoff = numberOfAppsReady === numberOfAppsToServe;

        if (readyForLiftoff) {
            console.log(`\nIGNITION SUCCESSFUL\n`);

            opn('http://localhost:3000');
        } else {
            const percentComplete = 100 * (numberOfAppsReady / numberOfAppsToServe);

            console.log(`\n${String(app).toUpperCase()} HAS BEEN BUILT, ${percentComplete}% COMPLETE\n`);
        }
    });
}

(() => {
    const { apps, appOnly } = argv;
    const parsedApps = apps ? apps.split(',') : [];
    const appsToServe = parsedApps;

    if (!appOnly) appsToServe.push('host');

    appsToServe.forEach(app => {
        serveApp(app, appsToServe.length);
    })
})();
