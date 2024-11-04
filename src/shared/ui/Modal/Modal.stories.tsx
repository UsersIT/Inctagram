import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Button } from '../Button/Button'
import { Modal } from './Modal'

const meta = {
  argTypes: {
    onClose: {
      description: 'Optional callback function that is called to close the modal.',
    },
    onNextButton: {
      description: 'Optional callback function that is called when the next button is clicked.',
    },
    onPreviousButton: {
      description: 'Optional callback function that is called when the previous button is clicked.',
    },
    open: {
      control: '-',
      description:
        "The open prop is a boolean that determines the visibility of the Modal component. It requires an external state management within the parent component to toggle the modal's visibility. ",
    },
    showCloseButton: {
      description: 'Optional callback function that is called to display the modal close button.',
    },
    showNextButton: {
      description: 'Optional boolean that determines whether to show a next button in the modal.',
    },
    showPreviousButton: {
      description: 'Optional boolean that determines whether to show a close button in the modal.',
    },
    size: {
      control: { type: 'radio' },
      description:
        'Optional value defining the size of the modal:\n' +
        '   * sm - 378px,\n' +
        '   * md - 492px,\n' +
        '   * lg - 644px.\n' +
        '   * xlg - 972px.\n' +
        '   * For other values use className',
    },
    title: {
      control: { type: 'text' },
      description: 'Optional string that sets the title of the modal.',
    },
    withoutHeader: {
      description: 'Optional view without header.',
    },
  },
  component: Modal,
  parameters: {
    docs: {
      description: {
        component:
          'Modal component is based on Dialog from Radix UI and uses animations from Framer Motion.',
      },
    },
  },

  tags: ['autodocs'],
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultModal: Story = {
  args: {
    children: 'Modal',
    open: false,
    showCloseButton: false,
    showNextButton: false,
    showPreviousButton: false,
    size: 'md',
    title: 'Modal',
    withoutHeader: false,
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const handleModalOpen = () => {
      setOpen(!open)
    }

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal {...args} onClose={handleModalOpen} open={open}>
          <div style={{ padding: ' 23px 24px 23px' }}> Modal content here </div>
        </Modal>
      </>
    )
  },
}
