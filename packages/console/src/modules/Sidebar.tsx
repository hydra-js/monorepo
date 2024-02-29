import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import useAuth from 'src/hooks/useAuth';

import HydraIconUnstyled from 'src/icons/Hydra';

const Container = styled.div`
  background-color: #16032f;
  color: #ffffff;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    width: 100%;
    text-align: center;

    li {
      padding: 3px 0;
      cursor: pointer;
    }
  }
`;

const HydraIcon = styled(HydraIconUnstyled)`
  margin: 20px 0;
`;

const Nav = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 20px;
`;

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Container>
      <HydraIcon filled width={48} height={48} color='red' />

      <Nav>
        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/namespaces')}>Namespaces</li>
          <li onClick={() => navigate('/resources')}>Resources</li>
          <li onClick={() => navigate('/users')}>Users</li>
          <li onClick={() => navigate('/assets')}>Assets</li>
        </ul>

        <ul>
          <li onClick={() => navigate('/settings')}>Settings</li>
          <li onClick={() => logout()}>Logout</li>
        </ul>
      </Nav>
    </Container>
  );
}
