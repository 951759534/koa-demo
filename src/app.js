const app = require('./app/index.js');
const config = require('./config/config.default.js');



app.listen(config.port, () => {
    console.log(`Server is running at http://localhost:${config.port}`);
});