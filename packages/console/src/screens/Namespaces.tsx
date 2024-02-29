import RootLayout, { ContainerProps } from 'src/layouts/Root';
import MainLayout from 'src/layouts/Main';

export default function Namespaces(props: ContainerProps) {
  return (
    <RootLayout {...props}>
      <MainLayout>
        <div>List all namespaces</div>
        <div>Create a namespace</div>
      </MainLayout>
    </RootLayout>
  );
}
