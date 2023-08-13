import { CustomError } from 'ts-custom-error';

export default class BaseError extends CustomError {
  public readonly statusCode: number;

  constructor(message: string, httpCode: number) {
    super(message);
    this.statusCode = httpCode;
  }
}
