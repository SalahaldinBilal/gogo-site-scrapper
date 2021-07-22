export default class GogoAPIError extends Error {

    constructor(statusCode: number, message?: string) {
        super(statusCode + ' ' + message);
        Object.setPrototypeOf(this, GogoAPIError.prototype);
    }

}