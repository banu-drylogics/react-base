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
        disabled: false,
        message: 'Do you want to adjust the emotion on this comment from Surprise to Fear?',
        hovered: false
    }
};

export const DisabledButton: Story = {
    args: {
        text: 'Click Me',
        disabled: true,
        message: 'Do you want to adjust the emotion on this comment from Surprise to Fear?',
        hovered: false
    }
};

export const CustomTooltip: Story = {
    args: {
        text: 'Hover Me',
        disabled: false,
        message: 'Do you want to adjust the emotion on this comment from Surprise to Fear?',
        hovered: true
    }
};
