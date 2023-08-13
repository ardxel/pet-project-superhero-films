import expressAsyncHandler from 'express-async-handler';
export default abstract class RoutesConfig {
  protected readonly app: import('express').Application;
  public readonly name: string;
  constructor(app: import('express').Application, name?: string) {
    this.app = app;
    this.name = name || this.constructor.name;
    this.configureRoutes();
  }
  asyncHandler = expressAsyncHandler;

  abstract configureRoutes(): import('express').Application;
}
