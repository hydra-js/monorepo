import ThemeProvider from './ThemeProvider';
import { AuthContext } from './Auth';
import { useEffect, useState } from 'react';

function getAuth() {
  const __hydra = window.localStorage.getItem('__hydra');
  return __hydra ? JSON.parse(__hydra) : null;
}

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function Providers({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    if (auth) return;

    const _auth = getAuth();
    setAuth(_auth);
    setIsLoading(false);
  }, [auth, isLoading]);

  return (
    <AuthContext.Provider value={auth}>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthContext.Provider>
  );
}
