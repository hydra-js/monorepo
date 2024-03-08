import styled from 'styled-components';

import NavbarModule from 'src/modules/Navbar';
import NavbarSecondaryModule from 'src/modules/NavbarSecondary';

const Container = styled.div`
  display: flex;
  background-color: #fdffff;
  height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
`;

const Content = styled.div`
  padding: 20px;
`;

const Sidebar = styled.section`
  background-color: #f2f5fb;
  width: 200px;
  // position: absolute;
  height: 100vh;
`;

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function ConsoleLayout({ children }: Props) {
  return (
    <Container>
      <NavbarModule />
      <Main>
        <Sidebar />
        <Content>{children}</Content>
      </Main>
      <NavbarSecondaryModule />
    </Container>
  );
}
