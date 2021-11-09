import React, { useState, useEffect } from 'react';

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

const AttachedApp = ({ remoteName, moduleName }) => {
    const [app, setApp] = useState(<>Please wait while the application is loaded</>);

    useEffect(() => {
        attachRemote([remoteName]).then((module) => {
            setApp(module[moduleName])
         });
    }, [ remoteName ]);

    return app;
};

const MicroApp = ({ remoteName, moduleName }) => <AttachedApp remoteName={remoteName} moduleName={moduleName} />;

export {
    MicroApp
}
