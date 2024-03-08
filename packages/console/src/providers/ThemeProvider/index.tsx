import { ThemeProvider as StyledProvider } from 'styled-components';

import './reset.css';
import './main.css';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function ThemeProvider({ children }: Props) {
  return (
    <StyledProvider theme={{}}>
      <>{children}</>
    </StyledProvider>
  );
}
