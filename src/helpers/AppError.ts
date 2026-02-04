class AppError extends Error {
  statusCode: number;
  data?: any;

  constructor(message: string, statusCode: number = 500, data?: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, data?: any) {
    super(message, 400, data);
  }

  static fromRoutingControllers(error: any): ValidationError {
    const errors = error.errors || [];
    const formattedErrors = errors.map((err: any) => ({
      field: err.property,
      constraints: err.constraints,
    }));

    return new ValidationError("Validation failed", formattedErrors);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden") {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export default AppError;
