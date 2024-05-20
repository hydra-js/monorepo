import path from 'node:path';
import handlebars from 'handlebars';
import fs from 'node:fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export function secure(req, res, next) {
  // Add security headers
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
}

export function useHandlebars(req, res, next) {
  res.renderHtml = (view, options = {}) => {
    const viewsPath = path.join(__dirname, '..', '..', 'views');
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

export function useJSX(filePath, options, cb) {
  // JSX engine middleware
  try {
    const { locals } = options;
    const reactElement = require(filePath).default;
    const jsx = React.createElement(reactElement, locals);
    const jsxToHtml = ReactDOMServer.renderToString(jsx);

    // Render with master layout
    const viewsDirPath = path.join(__dirname, '..', '..', 'views');
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
