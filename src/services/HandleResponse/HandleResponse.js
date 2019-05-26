const prepareResponse = (appResponse) => {
    if (appResponse instanceof Array)
        return {items: appResponse};

    if (typeof appResponse !== 'object')
        return {message: appResponse};

    return appResponse;
};

class HandleResponse {

    constructor (responseStream) {
        this.stream = responseStream;
    }

    static getInstance (responseStream) {
        return new HandleResponse(responseStream);
    }

    throwError (appResponse) {
        this.stream.status(appResponse.statusCode).json({
            success: false,
            message: appResponse.message
        });
    }

    sendResponse (appResponse) {
        appResponse = prepareResponse(appResponse);
        appResponse.success = 'success' in appResponse ? appResponse.success : true;

        this.stream.status(200).json(appResponse);
    }
}

module.exports = HandleResponse;