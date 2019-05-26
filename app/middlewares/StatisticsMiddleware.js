const Interface = require('./MiddlewareInterface');

let views = 0;

class StatisticsMiddleware extends Interface {
    static handle (req, res, next) {
        console.log('Current views value: ', ++views);

        next();
    }
}

module.exports = StatisticsMiddleware;