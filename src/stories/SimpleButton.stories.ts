import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SimpleButton from './SimpleButton';

const meta = {
    title: 'SimpleButton',
    component: SimpleButton,
    args: { onClick: fn() },
} satisfies Meta<typeof SimpleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenPopup: Story = {
    args: {
        text: 'Click Me!!!',
        message: 'Do you want to adjust the emotion on this comment from Surprise to Fear?'
    }
};

export const ButtonDisabled: Story = {
    args: {
        text: 'Click Me',
        tooltip: 'Unable to View the Modal'
    }
};