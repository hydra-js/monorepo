import RootLayout, { ContainerProps } from 'src/layouts/Root';
import MainLayout from 'src/layouts/Main';

export default function Settings(props: ContainerProps) {
  return (
    <RootLayout {...props}>
      <MainLayout>
        <div>Settings</div>
      </MainLayout>
    </RootLayout>
  );
}
