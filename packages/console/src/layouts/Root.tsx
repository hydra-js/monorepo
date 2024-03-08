/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAppStatus as apiGetAppStatus } from 'src/api/core';

import useAuth from 'src/hooks/useAuth';
import Login from 'src/screens/Login';

export type ContainerProps = {
  enableAuth?: boolean;
};

type LayoutProps = {
  children: JSX.Element | JSX.Element[];
};

type Props = ContainerProps & LayoutProps;

export default function RootLayout({ children, enableAuth = false }: Props) {
  const navigate = useNavigate();
  const { loading, error, user } = useAuth();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    apiGetAppStatus()
      .then((appStatus) => {
        if (!appStatus) return navigate('/bootstrap');
      })
      .catch(() => {})
      .finally(() => setIsReady(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = enableAuth ? loading || !isReady : !isReady;

  if (isLoading) return <div>loading...</div>;

  if (error) return <div>{error}</div>;

  if (enableAuth && !user) return <Login />;

  return <>{children}</>;
}
