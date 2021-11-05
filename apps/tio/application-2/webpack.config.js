const baseConfig = require('../../../tools/webpack.config');

const PORT = '3002';

module.exports = {
    ...baseConfig(__dirname, PORT, 'application2')
};