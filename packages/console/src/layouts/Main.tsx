import styled from 'styled-components';

// import Sidebar from 'src/modules/Sidebar';
import Header from 'src/modules/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  // width: 100%;
  padding: 20px;
`;

// const SidebarWrapper = styled.aside`
//   width: 120px;
//   border-right: 1px solid #ccc;
// `;

const Main = styled.main`
  flex: 1;
  padding: 20px 0;
`;

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function MainLayout({ children }: Props) {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
    </Container>
  );
}
