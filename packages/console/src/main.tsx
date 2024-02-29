import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Providers from 'src/providers';
import Namespaces from 'src/screens/Namespaces';
import Resources from 'src/screens/Resources';
import Users from 'src/screens/Users';
import Assets from 'src/screens/Assets';
import Settings from 'src/screens/Settings';
import Home from 'src/screens/Home';

import { init as httpInit } from 'src/utils/http';

httpInit();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home enableAuth />,
  },
  {
    path: '/namespaces',
    element: <Namespaces enableAuth />,
  },
  {
    path: '/resources',
    element: <Resources enableAuth />,
  },
  {
    path: '/users',
    element: <Users enableAuth />,
  },
  {
    path: '/assets',
    element: <Assets enableAuth />,
  },
  {
    path: '/settings',
    element: <Settings enableAuth />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);
