import styled from 'styled-components';

import Sidebar from 'src/modules/Sidebar';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
`;

const SidebarWrapper = styled.aside`
  width: 150px;
  border-right: 1px solid #ccc;
`;

const Main = styled.main`
  flex: 1;
`;

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function MainLayout({ children }: Props) {
  return (
    <Container>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <Main>{children}</Main>
    </Container>
  );
}
