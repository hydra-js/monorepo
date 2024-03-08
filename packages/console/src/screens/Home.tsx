import MainLayout from 'src/layouts/Main';
import RootLayout, { ContainerProps } from 'src/layouts/Root';

export default function Home(props: ContainerProps) {
  return (
    <RootLayout {...props}>
      <MainLayout>
        <h2>Welcome to Hydra-JS</h2>

        <div>
          <h3>Overview</h3>
          <ul>
            <li>Namespaces</li>
            <li>Resources</li>
            <li>Users</li>
            <li>Assets</li>
            <li>Settings</li>
          </ul>
        </div>

        <div>
          <h3>Activity Log</h3>
          <ul>
            <li>New namespace created.</li>
            <li>New resource created.</li>
            <li>New user invited.</li>
          </ul>
        </div>
      </MainLayout>
    </RootLayout>
  );
}
