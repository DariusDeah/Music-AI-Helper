export interface CustomError extends Error {
  statusCode: number;
}

export class AIError extends Error implements CustomError {
  statusCode: number;
  constructor() {
    super("AI had issues processing your request!");
    this.name = "AI_ERROR";
    this.statusCode = 500;
  }
}

export class UnAuthenticatedError extends Error implements CustomError {
  statusCode: number;
  constructor() {
    super("Unauthenticated user, please log in to access");
    this.name = "AUTH_ERROR";
    this.statusCode = 401;
  }
}

export class UserAlreadyExistsError extends Error implements CustomError {
  statusCode: number;
  constructor() {
    super(
      "this user already exists, please update your information and try again!"
    );
    this.name = "USER_ALREADY_EXIST_ERROR";
    this.statusCode = 400;
  }
}

export class InvalidCredsError extends Error implements CustomError {
  statusCode: number;
  constructor() {
    super(
      "invalid email or password, please update your information and try again"
    );
    this.name = "USER_ALREADY_EXIST_ERROR";
    this.statusCode = 400;
  }
}
