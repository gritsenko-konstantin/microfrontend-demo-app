import React, { Suspense, useState, useEffect } from 'react';

const useDynamicScript = (url) => {
    return new Promise((resolve) => {
        if (!url) {
            return;
        }

        const element = document.createElement('script');

        element.src = url;
        element.type = 'text/javascript';
        element.async = true;

        element.onload = () => {
            resolve(true);
        };

        element.onerror = () => {
            resolve(false);
        };

        document.head.appendChild(element);
    });
};

/*
Gets the remote from the window object.  Solution obtained here:
https://github.com/module-federation/module-federation-examples/blob/master/dynamic-system-host/app1/src/App.js
 */
const initializedRemoteContainer = async (scope, module = '.') => {
    await __webpack_init_sharing__('default');

    const container = window[scope];

    if (!container) {
        console.log(NO_REMOTE_ERROR);

        return;
    }

    await container.init(__webpack_share_scopes__.default);

    const factory = await window[scope].get(module);
    const Module = factory();
    
    return Module;
};

const attachRemote = async (remote) => {
    const remotePort = REMOTE_INFO[remote];
    const url = `${window.location.protocol}//${window.location.hostname}`;
    await useDynamicScript(`${url}:${remotePort}/remoteEntry.js`);
    const attachedRemote = await initializedRemoteContainer(remote);

    return attachedRemote;
};

const Loader = () => {
    return (
        <>Please wait while the application is loaded</>
    );
};

const AttachedApp = ({ name }) => {
    const [app, setApp] = useState(<>loading</>);

    useEffect(() => {
        attachRemote([name]).then((module) => {
            setApp(module[name])
         });
    }, [ name ]);

    return app;
};

const MicroApp = ({ name }) => {
    return (
        <Suspense fallback={<Loader />}>
            <AttachedApp name={name} />
        </Suspense>
    );
};

export {
    MicroApp
}
