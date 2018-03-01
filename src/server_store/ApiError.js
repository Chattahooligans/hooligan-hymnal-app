export default class ApiError extends Error {
    constructor(message, innerError = null, ...args) {
        // For most exceptions, it's sufficient to just provide a message and
        // inner exception (if there is one), so make those the first two
        // arguments. Then pass (message, fileName, lineNumber) to Error().
        //
        // Also, Expo doesn't make use of .toString() overrides for formatting
        // exception messages, so preformat .message here.
        let extendedMessage = message + (innerError ? `:\n\n${innerError}` : '');
        super(...[extendedMessage, args]);

        this.innerError = innerError;
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, ApiError);
        }
    }
};
