const path = require('path');
const os = require('os');
const spawn = require('cross-spawn');

const serveApp = (app) => {
    const prefix = {}; // color(`[${configType}]`);
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
            PATH: process.env.PATH,
            APPDATA: process.env.APPDATA
        }
    });

    // console.log(prefix, colors.yellow.bold.underline(' --- IGNITING ---\n'));

    wds.stdout.on('data', data => {
        // console.log(prefix, ` ${data}`);
    });

    wds.stderr.on('data', data => {
        console.log(`${data}`);
    });

    wds.on('error', err => {
        // console.log(prefix, `ERROR 2 ${err}`);
        // console.log(prefix, ' Failed to start webpack dev server. ', err);
    });

    wds.on('close', code => {
        // console.log(prefix, `EXITING ${code}`);
        // console.log(prefix, `EXITING --> child process exited with code ${code}`);
    });

    wds.on('message', message => {
        console.log(prefix, ` ${message}`);

        message === 'ready' && numberOfAppsReady++;

        const readyForLiftoff = numberOfAppsReady === numberOfAppsReadyNeeded;

        if (!hasLiftedOff && readyForLiftoff) {
            if (launchWhenComplete) {
                // console.log(prefix, colors.bold.green(`${appOnly ? ' --- IGNITION SUCCESSFUL ---' : liftoffAsciiArt}`));

                // open && !appOnly && !libsOnly && opn('http://localhost:3333/tio/app.html#/');

                hasLiftedOff = true;
            }

            resolve();
        } else if (!hasLiftedOff && !appOnly) {
            // console.log(prefix, colors.bold.green(` is READY, but other micro apps still preparing for launch.`));
        }
    });
}

const serveApps = () => {
    const appsToServe = ['host', 'application-1', 'application-2'];

    appsToServe.forEach(app => {
        serveApp(app);
    })
};

serveApps();
// serveApp('host');