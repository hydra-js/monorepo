import express from 'express';
import cors from 'cors';
import register from '@babel/register';

import config from './config';
import { secure, useHandlebars, useJSX } from './middlewares';
import { getRoutes, normalizePort, getApiHandler } from './utils';

const { HYDRA_PORT, __publicdir, __templatedir } = config;

export async function startDefaultServer() {
  // Register Babel for JSX files
  register({
    extensions: ['.jsx'],
  });

  // (@configs)
  const PORT = normalizePort(Number(HYDRA_PORT) || 3000);
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
  app.set('views', __templatedir);
  app.set('view engine', 'jsx');

  // Serve static files
  app.use(express.static(__publicdir));

  // Error handling middleware
  app.use((err, req, res) => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
    return res.renderHtml('500', { error: err });
  });

  app.use('/api', (req, res, next) => {
    const handler = getApiHandler(req);
    if (handler && typeof handler === 'function')
      return handler(req, res, next);

    return res.sendStatus(404);
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
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
  });
}
