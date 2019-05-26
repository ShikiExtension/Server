/**
 * @type {Pool}
 */
const pool = require('promise-mysql').createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// stub
const sendQuery = pool.query.bind(pool);
pool.query = function(){
    return sendQuery(...arguments).catch(error => {
        console.error('MYSQL: ', error.message, error.stack);

        return Promise.reject(error);
    });
};
// /stub

module.exports = pool;