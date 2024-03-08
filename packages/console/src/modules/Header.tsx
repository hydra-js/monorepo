import styled from 'styled-components';

import HydraIcon from 'src/icons/Hydra';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const Right = styled.div`
  display: flex;
`;

export default function HeaderModule() {
  return (
    <Header>
      <Left>
        <HydraIcon filled />
        <h3>Hydra</h3>
      </Left>

      <Right>
        <ul>
          <li>Docs</li>
          <li>Status</li>
          <li>Search</li>
          <li>Notifications</li>
          <li>Profile Icon -- Logout</li>
        </ul>
      </Right>
    </Header>
  );
}
