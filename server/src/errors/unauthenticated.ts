import { StatusCodes } from 'http-status-codes';
import BaseError from './base-error';

export default class UnauthenticatedError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
