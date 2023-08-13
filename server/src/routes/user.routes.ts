import RoutesConfig from 'common/Routes.config';
import { UserController } from 'controllers';
import { Application, Router } from 'express';
import authenticationMiddleware from 'middleware/authentication.middleware';
import usersMiddleware from 'middleware/users.middleware';

export class UserRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'UserRoutes');
  }

  configureRoutes(): Application {
    const route = Router();
    // sign up
    route.put(
      '/',
      [
        usersMiddleware.validateRequiredUserBodyFields('email', 'username', 'password'),
        usersMiddleware.validateEmailDoesntExists,
        usersMiddleware.validateUsernameDoesntExists,
        usersMiddleware.pushUserWithMissingFieldsInLocals,
      ],
      this.asyncHandler(UserController.signUp),
    );

    // sign in
    route.post(
      '/',
      [
        usersMiddleware.validateRequiredUserBodyFields('emailOrUsername', 'password'),
        usersMiddleware.validateEmailOrUsernameIsExist,
        usersMiddleware.checkPassword,
      ],
      this.asyncHandler(UserController.signIn),
    );

    route.get(
      '/',
      [
        authenticationMiddleware.validateTokenDoesntExists,
        authenticationMiddleware.validateIsExistsUserWithTokenPayload(true),
      ],
      this.asyncHandler(UserController.verifyUser),
    );

    // get profile
    route.get('/profile/:username', this.asyncHandler(UserController.getProfile));

    // edit profile
    route.patch(
      '/profile',
      [
        authenticationMiddleware.validateTokenDoesntExists,
        authenticationMiddleware.validateIsExistsUserWithTokenPayload(true),
      ],
      this.asyncHandler(UserController.editProfile),
    );

    // get country list
    route.get(
      '/countries',
      [
        authenticationMiddleware.validateTokenDoesntExists,
        authenticationMiddleware.validateIsExistsUserWithTokenPayload,
      ],
      this.asyncHandler(UserController.getAllCountries),
    );

    this.app.use('/api/v1/users', route);

    return this.app;
  }
}
