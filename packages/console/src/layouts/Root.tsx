import Unauthorized from 'src/screens/Unauthorized';

type Props = {
  children: JSX.Element | JSX.Element[];
  enableAuth?: boolean;
};

function getAuth() {
  // @todo: get auth object
  return {};
}

export default function RootLayout({ children, enableAuth = false }: Props) {
  if (enableAuth) {
    const auth = getAuth();
    if (!auth) return <Unauthorized />;
  }

  return <>{children}</>;
}
