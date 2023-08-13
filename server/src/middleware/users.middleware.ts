import { BadRequestError, UnauthenticatedError } from 'errors';
import { NextFunction, Request, Response } from 'express';
import model from 'models';
import { DocumentUser, IUser } from 'models/user/user.types';

class UsersMiddleware {
  /**
   * validation of user paths or another strings in request body
   * if one of this paths is false then throwing error
   * @param {Array<keyof IUser | string>} fields
   */
  validateRequiredUserBodyFields(...fields: Array<keyof IUser | string>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      fields.forEach(async (field) => {
        if (!req.body[field]) {
          next(new BadRequestError(`Missing required field: ${field}`));
        }
      });
      next();
    };
  }

  async validateEmailDoesntExists(req: Request, res: Response, next: NextFunction) {
    const user = await model.user.findOne({ email: req.body.email });

    if (user) {
      next(new BadRequestError('email already taken'));
    } else {
      next();
    }
  }

  async validateUsernameDoesntExists(req: Request, res: Response, next: NextFunction) {
    const username = req.body.username || req.params.username;
    const user = await model.user.findOne({ username: username });

    if (user) {
      next(new BadRequestError('username already taken'));
    } else {
      next();
    }
  }

  async pushUserWithMissingFieldsInLocals(req: Request, res: Response, next: NextFunction) {
    res.locals.user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: 'USER',
      favorites: [],
      watchlist: [],
      ratings: [],
    };
    next();
  }

  async validateEmailOrUsernameIsExist(req: Request, res: Response, next: NextFunction) {
    const user = await model.user.findOne({
      $or: [{ email: req.body.emailOrUsername }, { username: req.body.emailOrUsername }],
    });

    if (!user) {
      next(new BadRequestError('User with this email or username is not exists'));
    }
    res.locals.user = user;
    next();
  }

  async checkPassword(req: Request, res: Response, next: NextFunction) {
    const passwordFromRequest = req.body.password;

    const user = res.locals.user as DocumentUser;

    if (!(await user.checkPassword(passwordFromRequest))) {
      next(new UnauthenticatedError('password is invalid'));
    }
    next();
  }

  async validateUsernameReqParamsIsExists(req: Request, Response, next: NextFunction) {
    const username = req.params.username;

    if (!username) {
      next(new BadRequestError('username is no exists'));
    }
  }
}

export default new UsersMiddleware();
