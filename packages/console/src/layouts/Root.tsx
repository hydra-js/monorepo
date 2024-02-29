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
  const { user, loading, error } = useAuth();

  if (loading) return <div>loading...</div>;

  if (error) return <div>{error}</div>;

  if (enableAuth && !user) return <Login />;

  return <>{children}</>;
}
