import path from 'node:path';
import handlebars from 'handlebars';
import fs from 'node:fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import config from './config';

const { __templatedir, __indexlayout } = config;

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
    const templatePath = path.join(__templatedir, `${view}.html`);
    const body = handlebars.compile(fs.readFileSync(templatePath, 'utf8'))(
      options,
    );
    const html = handlebars.compile(fs.readFileSync(__indexlayout, 'utf8'))({
      ...options,
      body,
    });
    res.send(html);
  };
  next();
}

export function useJSX(filePath, options, cb) {
  // JSX engine middleware
  try {
    const { locals } = options;
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const reactElement = require(filePath).default;
    const jsx = React.createElement(reactElement, locals);
    const jsxToHtml = ReactDOMServer.renderToString(jsx);

    // Render with master layout
    const withTemplate = handlebars.compile(
      fs.readFileSync(__indexlayout, 'utf8'),
    );
    const html = withTemplate({ locals, body: jsxToHtml });

    cb(null, html);
  } catch (err) {
    // @TODO: Render error pages based on error code
    cb(err);
  }
}
