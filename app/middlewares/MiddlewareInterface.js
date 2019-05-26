/**
 * @interface
 */
class MiddlewareInterface {
    /**
     * @param {object} req
     * @param {object} res
     * @param {function} next
     * @abstract
     */
    static handle (req, res, next) {
        next();
    }
}

module.exports = MiddlewareInterface;