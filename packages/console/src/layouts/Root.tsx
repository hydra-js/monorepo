type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function RootLayout({ children }: Props) {
  return <>{children}</>;
}
