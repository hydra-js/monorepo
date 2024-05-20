import express from 'express';
import cors from 'cors';
import path from 'node:path';
import register from '@babel/register';

import { getRoutes, normalizePort } from './utils';
import { secure, useHandlebars, useJSX } from './middlewares';

export async function startDefaultServer() {
  // Register Babel for JSX files
  register({
    extensions: ['.jsx'],
  });

  // (@configs)
  const PORT = normalizePort(Number(process.env.PORT) || 3000);
  const metaProps = { page: { title: 'Hydra-JS Page Title' } };

  // bootstratp the app
  const app = express();
  const routes = getRoutes(path.join(__dirname, '..', '..', 'views'));

  // Set port
  app.set('port', PORT);

  app.use(cors());

  app.disable('x-powered-by'); // Reduce fingerprinting
  app.use(secure);
  // @TODO: Use `express-rate-limit`, `xss-clean`, 'hpp' and `helmet`

  app.use(useHandlebars);

  app.engine('jsx', useJSX);
  app.set('views', path.join(__dirname, '..', '..', 'views'));
  app.set('view engine', 'jsx');

  // Serve static files
  app.use(express.static(path.join(__dirname, '..', '..', 'public')));

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
}
