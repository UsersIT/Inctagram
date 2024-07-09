import React from 'react'

import { DatePicker, DatePickerProps } from '@/src/shared/ui/DatePicker/DatePicker'
import { Meta, Story } from '@storybook/react'

export default {
  component: DatePicker,
  title: 'Components/DatePickerInput',
} as Meta

const Template: Story<DatePickerProps> = args => <DatePicker {...args} />

export const Default = Template.bind({})
Default.args = {
  data: new Date('2011-01-01').toDateString(),
  label: 'Label',
  onChange: newValue => {},
}

export const ShowError = Template.bind({})
ShowError.args = {
  data: '',
  error: 'Show error message',
  onChange: newValue => {},
}