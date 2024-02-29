import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...restProps }: ButtonProps) {
  return <button {...restProps}>{children}</button>;
}

export default Button;
