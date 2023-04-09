const path = require('path');
const express = require('express');
const webpackMockServer = require('webpack-mock-server');

const BUILD_DIR = path.join(__dirname, '../build');
const PORT = 3000;
const app = express();

//Serving the files on the dist folder
app.use(express.static(BUILD_DIR));

//Send index.html when the user access the web
app.get('*', function(req, res) {
  res.sendFile(path.join(BUILD_DIR, 'index.html'));
});

webpackMockServer.use(app, {
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
    resolveJsonModule: true
  },
  strictCompilerOptions: {
    // these options impossible to override
    outDir: '', // used the following: {os.tmpdir()}/webpack-mock-server/{news
                // Date().getTime()}
    rootDir: process.cwd(),
    noEmit: false,
    noEmitHelpers: false,
    esModuleInterop: true,
    module: 'ts.ModuleKind.CommonJS',
    declaration: false,
    moduleResolution: 'node'
  },
  before: (req, res, next) => {
    console.log(`Got request: ${req.method} ${req.url}`);
    next();
  }
});

app.listen(PORT);

module.exports = {};