import { StatusCodes } from 'http-status-codes';
import BaseError from './base-error';

export default class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}
