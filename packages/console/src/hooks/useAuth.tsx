import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import * as apiUser from 'src/api/users';
import * as apiAuth from 'src/api/auth';

export type User = {
  id: string;
  name: {
    screen_name: string;
  };
  email: string;
  role: number;
  status: number;
  token: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  useEffect(() => {
    setError(undefined);

    apiUser
      .getCurrentUser()
      .then((user) => setUser(user))
      .catch((err) => setError(err))
      .finally(() => setLoadingInitial(false));
  }, []);

  function login() {
    setLoading(true);

    apiAuth
      .login()
      .then((user: any) => {
        setUser(user);
      })
      .catch((error: any) => setError(error))
      .finally(() => setLoading(false));
  }

  function logout() {
    apiAuth.logout().then(() => setUser(undefined));
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default function useAuth() {
  return useContext(AuthContext);
}
