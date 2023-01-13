
class ErrorResponse {
    constructor(message, status = 400) {
        this.message = message;
        this.status = status;
    }
}

class InvalidBodyErrorResponse extends ErrorResponse {
    constructor(message, fieldError, status = 422) {
        super(message, status);
        this.fieldError = fieldError;
    }
}

module.exports = {
    ErrorResponse,
    InvalidBodyErrorResponse
};