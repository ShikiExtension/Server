class HttpException extends Error {
    constructor (message) {
        super(message || 'Internal server errror');

        this.statusCode = 500;
    }

    getStatusCode () {
        return this.statusCode;
    }
}

module.exports = HttpException;