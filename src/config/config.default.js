const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT || 3000,
    staticDir: process.env.STATIC_DIR || 'public',
    logLevel: process.env.LOG_LEVEL || 'info',
    ...process.env
};