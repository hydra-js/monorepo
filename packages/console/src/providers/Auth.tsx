import { createContext } from 'react';

type Auth = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
};

export const AuthContext = createContext<null | Auth>(null);
