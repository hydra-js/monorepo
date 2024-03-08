import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.aside`
  width: 55px;
  background-color: #121a22;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Nav = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 12px;
`;

type NavItemProps = { label: string; active?: boolean };

const NavItem = styled.li<NavItemProps>`
  background-color: ${({ label, active }) =>
    label === 'home' ? '#6341b8' : active ? '#f2f5fb' : '#121a22'};
  color: ${({ active }) => (active ? '#000000' : '#ffffff')};
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default function NavbarModule() {
  const navigate = useNavigate();

  const handleClick = (evt) => {
    const label = evt.target.getAttribute('label');
    const target = label === 'home' ? '/' : `/${label}`;
    navigate(target);
  };

  return (
    <Container>
      <Nav>
        <NavItem onClick={handleClick} label='home'>
          HYDRA
        </NavItem>
        <NavItem onClick={handleClick} label='namespaces' active>
          NMS
        </NavItem>
        <NavItem onClick={handleClick} label='resources'>
          RES
        </NavItem>
        <NavItem onClick={handleClick} label='assets'>
          AST
        </NavItem>
        <NavItem onClick={handleClick} label='users'>
          USR
        </NavItem>
      </Nav>

      <Nav>
        <NavItem onClick={handleClick} label='notifications'>
          NTF
        </NavItem>
        <NavItem onClick={handleClick} label='settings'>
          SET
        </NavItem>
      </Nav>
    </Container>
  );
}
