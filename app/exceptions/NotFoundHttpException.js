const HttpException = require('./HttpException');

class NotFoundHttpException extends HttpException {
    constructor (message) {
        super(message || 'Not found');

        this.statusCode = 404;
    }
}

module.exports = NotFoundHttpException;