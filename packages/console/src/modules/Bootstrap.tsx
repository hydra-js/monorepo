import { useNavigate } from 'react-router-dom';
import { install as apiInstall } from 'src/api/core';

export default function BootstrapModule() {
  const navigate = useNavigate();

  const install = () => {
    apiInstall()
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        navigate('/');
      });
  };

  return (
    <div>
      <pre>
        <code>
          {`
            - {show logo, name (Hydra)}
            - Welcome text
            - Input Fields: 
              - App Name/Site Title
              - Description
              - Master User Name
              - E-mail
              - Password
          `}
        </code>
      </pre>

      <button onClick={install}>Btn:Install</button>
    </div>
  );
}
