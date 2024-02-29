import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button.example';

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    disabled: false,
    onClick: () => console.log('Button'),
  },
};
export const Secondary: Story = {
  args: {
    children: 'Button',
    disabled: false,
    onClick: () => console.log('Button'),
  },
};
