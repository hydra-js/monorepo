import { useEffect, useState } from 'react';

import { AuthProvider } from 'src/hooks/useAuth';
import { getAuth } from 'src/utils/auth';

import ThemeProvider from './ThemeProvider';

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
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
}
