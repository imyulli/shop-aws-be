export class ApplicationError extends Error {
    constructor(message: string = '') {
        super(message);
    }
    get name() {
        return this.constructor.name;
    }
    get statusCode() {
        return 500
    }
}

export class NotFoundError extends ApplicationError {
    get statusCode() {
        return 404
    }
}

export class ProductIsInvalid extends ApplicationError {
    get statusCode() {
        return 400
    }
}