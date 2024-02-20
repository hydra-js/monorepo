import { useContext } from 'react';
import { AuthContext } from 'src/providers/Auth';
import Unauthorized from 'src/screens/Unauthorized';

type Props = {
  children: JSX.Element | JSX.Element[];
  enableAuth?: boolean;
};

export default function RootLayout({ children, enableAuth = false }: Props) {
  const auth = useContext(AuthContext);

  if (enableAuth && !auth) return <Unauthorized />;

  return <>{children}</>;
}
