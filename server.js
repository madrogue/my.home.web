
const Koa = require('koa');
const serve = require('koa-static');
const mount = require('koa-mount');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const utils = require('./src/utils');
const Logger = require('./src/log');

const app = new Koa();

// Middleware to add X-ResponseTime and other useful headers
app.use(async (ctx, next) => {
  const start = Date.now();
  // Generate a unique request ID
  const requestId = uuidv4();
  ctx.request.id = requestId;
  await next();
  const ms = Date.now() - start;
  ctx.set('x-responsetime', `${ms}ms`);
  ctx.set('x-powered-by', 'my.home.web');
  ctx.set('x-request-id', requestId);
});

// Load config.json for settings and external mounts
const configPath = path.join(__dirname, 'config.json');

// Default config object
const defaultConfig = {
  port: 8080,
  baseApiUrl: 'http://localhost:8081',
  externalPages: [],
  log: {
    type: 'console',
    level: 'debug'
  }
};

// Ensure config.json exists
if (!fs.existsSync(configPath)) {
  fs.writeFileSync(configPath, '{}', 'utf-8');
}


// Load and merge config
let config = { ...defaultConfig };
try {
  const fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  config = utils.deepMerge(config, fileConfig);
} catch (e) {
  // logger not yet instantiated, use console.warn
  console.warn('Could not parse config.json, using defaults.');
}

// Instantiate logger
const log = new Logger(config.log);

let PORT = config.port;
if (process.env.PORT) {
  PORT = process.env.PORT;
  console.log(`[INFO] Overriding config port: using process.env.PORT = ${PORT}`);
}
const BASE_API_URL = config.baseApiUrl;

// Serve the main public directory
app.use(serve(path.join(__dirname, 'public')));

// Mount external static folders
if (Array.isArray(config.externalPages)) {
  config.externalPages.forEach(({ mount: mountPath, path: folderPath }) => {
    if (mountPath && folderPath) {
      // Expand ~ to home directory
      const resolvedPath = folderPath.replace(/^~($|\/|\\)/, process.env.HOME + '$1');
      app.use(mount(mountPath, serve(path.resolve(resolvedPath))));
      log.debug(`Mounted ${resolvedPath} at ${mountPath}`);
    }
  });
}

app.listen(PORT, () => {
  log.debug(`Frontend server running on http://localhost:${PORT}`);
  log.debug(`Base API URL: ${BASE_API_URL}`);
});
