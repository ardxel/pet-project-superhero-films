import config from 'config';
import { UnauthenticatedError } from 'errors';
import { NextFunction, Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import { JwtPayload, verify } from 'jsonwebtoken';
import model from 'models';

const expectedError = new UnauthenticatedError('Authentication invalid');

class AuthorizationMiddleware {
  async validateTokenDoesntExists(req: Request, res: Response, next: NextFunction) {
    if (!validateAuthHeader(req.headers)) {
      return next(expectedError);
    }

    const token = getTokenFromHeader(req.headers.authorization!);
    res.locals.token = token;
    return next();

    function validateAuthHeader(headers: IncomingHttpHeaders): boolean {
      return Boolean(headers?.authorization || headers?.authorization?.startsWith('Bearer '));
    }
    function getTokenFromHeader(header: string): string {
      const [bearer, token] = header.split(' ');
      return token || '';
    }
  }

  /**
   * @param {boolean} returnUser if true then user will be throw into response locals if he exists in DB
   */

  validateIsExistsUserWithTokenPayload(returnUser: boolean) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const payload = verify(res.locals.token, config.jwt.secret) as JwtPayload;
        //attach the user to the job routes
        const user = await model.user.findById(payload.userId);
        if (!user) {
          return next(expectedError);
        }
        if (returnUser) {
          res.locals.user = user;
        }
        next();
      } catch (error) {
        next(expectedError);
      }
    };
  }
}

export default new AuthorizationMiddleware();
