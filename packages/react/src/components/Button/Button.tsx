import clsx from 'clsx';
import * as $ from '../../generics/components/Button';

export interface ButtonProps extends $.ButtonProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'contained' | 'outlined' | 'text';
}

export function Button({
  children,
  className,
  size,
  variant,
  ...restProps
}: ButtonProps) {
  return (
    <$.Button
      {...restProps}
      className={clsx(
        'h-btn',
        variant && `h-btn__${variant}`,
        size && `h-btn__${size}`,
        className,
      )}
    >
      {children}
    </$.Button>
  );
}

export default Button;
