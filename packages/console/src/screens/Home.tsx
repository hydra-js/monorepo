import MainLayout from 'src/layouts/Main';
import RootLayout, { ContainerProps } from 'src/layouts/Root';

export default function Home(props: ContainerProps) {
  return (
    <RootLayout {...props}>
      <MainLayout>
        <div>Console Home</div>
      </MainLayout>
    </RootLayout>
  );
}
