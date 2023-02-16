const webpackMockServer = require('webpack-mock-server');
const dev = require('./webpack.dev');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = function (env, argv) {
  const isDevServer = env.WEBPACK_SERVE;
  const mode = argv.mode || (isDevServer ? 'development' : 'production');
  const isDevMode = mode !== 'production';

  const configDev = dev(env, argv);
  const serveConfig = {
    devServer: {
      hot: isDevMode,
      port: 3000,
      historyApiFallback: true,
      onBeforeSetupMiddleware: (devServer) =>
        webpackMockServer.use(devServer.app, {
          port: 5000, // app searches for free port (starts searching from
          // pointed)
          host: '[hostname]',
          verbose: false, // send info via console.log
          logRequests: false,
          logResponses: false,
          entry: path.resolve(__dirname, 'webpack.mock.ts'),
          compilerOptions: {
            // typescript.CompilerOptions that override tsconfig.json:[compilerOptions]
            strictNullChecks: false,
            noImplicitAny: false,
            noUnusedLocals: false,
            noUnusedParameters: false,
            skipLibCheck: true,
            resolveJsonModule: true,
          },
          strictCompilerOptions: {
            // these options impossible to override
            outDir: '', // used the following: {os.tmpdir()}/webpack-mock-server/{news Date().getTime()}
            rootDir: process.cwd(),
            noEmit: false,
            noEmitHelpers: false,
            esModuleInterop: true,
            module: 'ts.ModuleKind.CommonJS',
            declaration: false,
            moduleResolution: 'node',
          },
          before: (req, res, next) => {
            console.log(`Got request: ${req.method} ${req.url}`);
            next();
          },
        }),
    },
  };

  return merge([configDev, serveConfig]);
};
