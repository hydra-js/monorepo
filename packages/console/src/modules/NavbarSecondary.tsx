import styled from 'styled-components';

const Container = styled.aside`
  width: 55px;
  background-color: #eff0f4;
  display: flex;
  flex-direction: column;
`;

const Nav = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 12px;
`;

type NavItemProps = { $label: string; active?: boolean };

const NavItem = styled.li<NavItemProps>`
  background-color: #eff0f4;
  color: #000000;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default function SecondaryNavbarModule() {
  return (
    <Container>
      <Nav>
        <NavItem $label='status'>STS</NavItem>
        <NavItem $label='docs'>DOC</NavItem>
      </Nav>
    </Container>
  );
}
