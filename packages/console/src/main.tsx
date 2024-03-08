import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ConsoleLayout from './layouts/Console';

import Providers from 'src/providers';
import Bootstrap from 'src/screens/Bootstrap';
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
    element: (
      <ConsoleLayout>
        <Home enableAuth />
      </ConsoleLayout>
    ),
  },
  {
    path: '/bootstrap',
    element: <Bootstrap />,
  },
  {
    path: '/namespaces',
    element: (
      <ConsoleLayout>
        <Namespaces enableAuth />
      </ConsoleLayout>
    ),
  },
  {
    path: '/resources',
    element: (
      <ConsoleLayout>
        <Resources enableAuth />
      </ConsoleLayout>
    ),
  },
  {
    path: '/users',
    element: (
      <ConsoleLayout>
        <Users enableAuth />
      </ConsoleLayout>
    ),
  },
  {
    path: '/assets',
    element: (
      <ConsoleLayout>
        <Assets enableAuth />
      </ConsoleLayout>
    ),
  },
  {
    path: '/settings',
    element: (
      <ConsoleLayout>
        <Settings enableAuth />
      </ConsoleLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);
