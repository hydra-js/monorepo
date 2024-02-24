import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/namespaces'>Namespaces</Link>
      </li>
      <li>
        <Link to='/resources'>Resources</Link>
      </li>
      <li>
        <Link to='/users'>Users</Link>
      </li>
      <li>
        <Link to='/assets'>Assets</Link>
      </li>
      <li>
        <Link to='/settings'>Settings</Link>
      </li>
    </ul>
  );
}
