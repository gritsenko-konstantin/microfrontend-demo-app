const baseConfig = require('../../../tools/webpack.config');

const PORT = '3001';

module.exports = {
    ...baseConfig(__dirname, PORT, 'application1')
};