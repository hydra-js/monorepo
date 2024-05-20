import express from 'express';
import cors from 'cors';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'node:path';
import fs from 'node:fs';
import register from '@babel/register';
import handlebars from 'handlebars';

// (@utils-js)
function noDotFiles(x) {
  return x[0] !== '.';
}

function readDir(root, filter, files, prefix) {
  prefix = prefix || '';
  files = files || [];
  filter = filter || noDotFiles;

  var dir = path.join(root, prefix);
  if (!fs.existsSync(dir)) return files;
  if (fs.statSync(dir).isDirectory())
    fs.readdirSync(dir)
      .filter(function (name, index) {
        return filter(name, index, dir);
      })
      .forEach(function (name) {
        readDir(root, filter, files, path.join(prefix, name));
      });
  else files.push(prefix);

  return files;
}

function getRoutes() {
  const templatePath = path.join(__dirname, 'views');
  const files = readDir(templatePath);
  const routes = {};
  files.forEach((fileOrDir) => {
    if (!fileOrDir.startsWith('_')) {
      const [path, type] = fileOrDir.split('.');
      // Exclude certain files
      if (!['404'].includes(path)) {
        // Only allowing for `jsx`, `html` file type for now
        if (['jsx', 'html'].includes(type)) {
          const pathNormalized = path
            .split('/')
            .filter((fp) => fp !== 'index')
            .join('/');

          routes[`/${pathNormalized}`] = {
            template: { engine: type, view: path },
            path: `${templatePath}/${path}.${type}`,
          };
        }
      }
    }
  });
  return routes;
}

// Normalize port into a number, string, or false.
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) return val;
  if (port >= 0) return port;

  return false;
}

// (@middlewares-js)
function secure(req, res, next) {
  // Add security headers
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
}

function useHandlebars(req, res, next) {
  res.renderHtml = (view, options = {}) => {
    const viewsPath = app.get('views');
    const templatePath = path.join(viewsPath, `${view}.html`);
    const withPageTemplate = handlebars.compile(
      fs.readFileSync(templatePath, 'utf8')
    );
    const pageHtml = withPageTemplate(options);

    const indexLayoutPath = path.join(viewsPath, '_layouts', 'index.html');
    const withLayoutTemplate = handlebars.compile(
      fs.readFileSync(indexLayoutPath, 'utf8')
    );
    const html = withLayoutTemplate({ ...options, body: pageHtml });

    res.send(html);
  };
  next();
}

function useJSX(filePath, options, cb) {
  // JSX engine middleware
  try {
    const { locals } = options;
    const reactElement = require(filePath).default;
    const jsx = React.createElement(reactElement, locals);
    const jsxToHtml = ReactDOMServer.renderToString(jsx);

    // Render with master layout
    const viewsDirPath = app.get('views');
    const indexLayoutPath = path.join(viewsDirPath, '_layouts', 'index.html');
    const withTemplate = handlebars.compile(
      fs.readFileSync(indexLayoutPath, 'utf8')
    );
    const html = withTemplate({ ...metaProps, body: jsxToHtml });

    cb(null, html);
  } catch (err) {
    // @TODO: Render error pages based on error code
    cb(err);
  }
}

// (@index-js)
// Register Babel for JSX files
register({
  extensions: ['.jsx'],
});

// (@configs)
const PORT = normalizePort(Number(process.env.PORT) || 3000);
const metaProps = { page: { title: 'Hydra-JS Page Title' } };

// bootstratp the app
const app = express();
const routes = getRoutes();

// Set port
app.set('port', PORT);
  
app.use(cors());

app.disable('x-powered-by'); // Reduce fingerprinting
app.use(secure);
// @TODO: Use `express-rate-limit`, `xss-clean`, 'hpp' and `helmet` 

app.use(useHandlebars);

app.engine('jsx', useJSX);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.renderHtml('500', { error: err });
});

// Handle incoming requests
app.get('*', (req, res) => {
  try {
    const route = routes[req.path];

    if (route && route.template.engine === 'jsx')
      return res.render(route.template.view, metaProps);

    if (route && route.template.engine === 'html')
      return res.renderHtml(route.template.view, metaProps);

    return res.renderHtml('404');
  } catch (err) {
    return res.renderHtml('500', { error: err });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
