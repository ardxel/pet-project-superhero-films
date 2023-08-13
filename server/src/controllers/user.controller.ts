import { BadRequestError } from 'errors';
import { NextFunction, Request } from 'express';
import * as fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import model from 'models';
import { DocumentUser, IUser, IUserSafe } from 'models/user/user.types';
import * as path from 'path';
import { ICountry, IResponse } from 'types';

export class UserController {
  static signUp = async (req: Request, res: IResponse<{ user: IUserSafe; token: string }>, next: NextFunction) => {
    // const user = await model.user.create(res.locals.user as IUser, {aggregateErrors: true});
    const user = new model.user(res.locals.user as IUser);
    try {
      await user.save();
      res.status(StatusCodes.CREATED).json({
        success: true,
        data: {
          user: user.getSafeCopy(),
          token: user.createToken(),
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  static signIn = async (req: Request, res: IResponse<{ user: IUserSafe; token: string }>) => {
    const user = res.locals.user as DocumentUser;

    res.status(StatusCodes.OK).json({
      success: true,
      data: {
        user: user.getSafeCopy(),
        token: user.createToken(),
      },
    });
  };
  // get profile by username
  static getProfile = async (req: Request, res: IResponse<{ user: IUserSafe }>) => {
    const { username } = req.params;

    const user = await model.user.findOne({ username });
    if (!user) {
      throw new BadRequestError(`user with username: ${username} is not exists`);
    }
    res.status(StatusCodes.OK).json({
      success: true,
      data: {
        user: user.getSafeCopy(),
      },
    });
  };
  /*
   * TODO
   * all changes happen on the server side
   */
  static editProfile = async (req: Request, res: IResponse<{ user: IUserSafe }>, next: NextFunction) => {
    const newFields = req.body.fields as Partial<IUser>;
    const user = res.locals.user as DocumentUser;
    Object.entries(newFields).forEach(([key, value]) => {
      user.change(key as keyof IUser, value);
    });
    try {
      const changedUser = await user.save();
      res.status(StatusCodes.OK).json({
        success: true,
        data: {
          user: changedUser.getSafeCopy(),
        },
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };

  static getAllCountries = async (req: Request, res: IResponse<{ countries: ICountry[] }>) => {
    const countriesFilePath = path.resolve('./data/countries.json');
    const allCountries = await fs.promises.readFile(countriesFilePath, 'utf8');
    res.status(200).json({ success: true, data: { countries: JSON.parse(allCountries) as ICountry[] } });
  };
}
