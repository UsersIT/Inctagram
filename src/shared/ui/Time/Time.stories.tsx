import type { Meta, StoryObj } from '@storybook/react'

import { Time } from './Time'

const meta: Meta<typeof Time> = {
  argTypes: {
    className: { control: 'text' },

    time: {
      control: 'text',
      description: 'Time to display example: 2022-10-25T12:00:00.000Z ',
    },
  },
  component: Time,
  parameters: {
    docs: {
      description: {
        component: 'timeago-react component',
      },
    },
  },
  tags: ['autodocs'],
  title: 'components/Time',
} satisfies Meta<typeof Time>

export default meta
type Story = StoryObj<typeof Time>

export const Default: Story = {
  args: {
    time: '2022-10-25T12:00:00.000Z',
  },
}
