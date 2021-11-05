const workspace = require('../workspace.json');

const STARTING_PORT = 3000;

const getRemotes = () => {
    return Object.fromEntries(
        Object.entries(workspace.projects)
        .filter(({1:value}) => value.includes('apps/'))
        .map(({0:key}, index) => [key, (STARTING_PORT + index)])
    );
};

const getRemote = (name) => {
    const remote = Object.entries(getRemotes())
        .filter(({0:key}) => {key === name})

    console.log('\n\n\n\n\n\n\nremote: ', remote);
};

module.exports = {
    getRemotes,
    getRemote
};