import RootLayout, { ContainerProps } from 'src/layouts/Root';
import MainLayout from 'src/layouts/Main';

export default function Resources(props: ContainerProps) {
  return (
    <RootLayout {...props}>
      <MainLayout>
        <div>Resources</div>
      </MainLayout>
    </RootLayout>
  );
}
