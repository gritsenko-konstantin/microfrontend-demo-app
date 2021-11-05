const { getRemote } = require('../../../tools/remote-management');
const baseConfig = require('../../../tools/webpack.config');

getRemote('host');

const PORT = '3000';

module.exports = {
    ...baseConfig(__dirname, PORT, 'host')
};