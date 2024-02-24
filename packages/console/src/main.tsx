import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Providers from 'src/providers';
import Root from 'src/screens/Root';
import Namespaces from 'src/screens/Namespaces';
import Resources from 'src/screens/Resources';
import Users from 'src/screens/Users';
import Assets from 'src/screens/Assets';
import Settings from 'src/screens/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/namespaces',
    element: <Namespaces />,
  },
  {
    path: '/resources',
    element: <Resources />,
  },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/assets',
    element: <Assets />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);
