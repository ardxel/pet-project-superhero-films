import { StatusCodes } from 'http-status-codes';
import BaseError from './base-error';

export default class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
