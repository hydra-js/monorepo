import RootLayout, { ContainerProps } from 'src/layouts/Root';
import MainLayout from 'src/layouts/Main';

export default function Users(props: ContainerProps) {
  return (
    <RootLayout {...props}>
      <MainLayout>
        <div>Users</div>
      </MainLayout>
    </RootLayout>
  );
}
