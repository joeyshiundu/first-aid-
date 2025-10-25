// Base class for all application-specific errors to allow for better error handling.
class ApplicationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        // This maintains the prototype chain for 'instanceof' to work correctly.
        Object.setPrototypeOf(this, new.target.prototype);
    
    }
}

/**
 * Thrown when a user provides an invalid email or password during login.
 * This should typically result in a 401 Unauthorized HTTP status.
 */
export class InvalidCredentialsError extends ApplicationError {
    constructor(message: string = 'Invalid credentials provided.') {
        super(message);
    }
}

/**
 * Thrown when a user attempts to log in, but their account is inactive, suspended, or not yet verified.
 * This should typically result in a 403 Forbidden HTTP status.
 */
export class InactiveAccountError extends ApplicationError {
    constructor(message: string = 'This account is inactive.') {
        super(message);
    }
}

/**
 * Thrown when a user is not found in the database.
 */
export class UserNotFoundError extends ApplicationError {
    constructor(message: string = 'User not found.') {
        super(message);
    }
}
