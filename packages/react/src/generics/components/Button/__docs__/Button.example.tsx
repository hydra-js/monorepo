import React, { FC } from 'react';
import { Button, ButtonProps } from '../';

const Example: FC<ButtonProps> = ({
  disabled = false,
  onClick = () => {},
  children = 'Button',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Button disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};

export default Example;
