import { AppError } from './appErrors';

export class BusinessError extends AppError {
  constructor(message = 'There is business error happened') {
    super(message);
  }
}

export class APINotFoundError extends BusinessError {
  constructor(message = 'API was not found') {
    super(message);
  }
}

export class SchemaNotFoundError extends BusinessError {
  constructor(message = 'Schema was not found') {
    super(message);
  }
}

export class AuthenticationError extends BusinessError {
  constructor(message = 'There is authentication error happened') {
    super(message);
  }
}

export class AuthorizationError extends BusinessError {
  constructor(message = 'There is authorization error happened') {
    super(message);
  }
}

export class TokenError extends BusinessError {
  constructor(message: string) {
    super(message);
  }
}

export class ResourceNotFound extends BusinessError {
  constructor(message: string) {
    super(message);
  }
}
