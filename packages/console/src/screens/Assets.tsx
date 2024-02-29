import RootLayout, { ContainerProps } from 'src/layouts/Root';
import MainLayout from 'src/layouts/Main';

export default function Assets(props: ContainerProps) {
  return (
    <RootLayout {...props}>
      <MainLayout>
        <div>Assets</div>
      </MainLayout>
    </RootLayout>
  );
}
