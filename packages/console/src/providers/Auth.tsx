import { createContext } from 'react';

type Auth = {
  protected?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  auth: any;
};

export const AuthContext = createContext<null | Auth>(null);
