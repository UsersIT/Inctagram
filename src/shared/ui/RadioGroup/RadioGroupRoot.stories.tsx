import { Card, Typography } from '@/src/shared/ui'
import { RadioGroupProps } from '@radix-ui/react-radio-group'
import { Meta } from '@storybook/react'

import { RadioGroupItem, RadioGroupRoot } from './'

export default {
  component: RadioGroupRoot,
  title: 'components/RadioGroup',
} as Meta<typeof RadioGroupRoot>

export const Default = {
  args: {
    defaultValue: 'day',
  },

  render: (args: RadioGroupProps) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Typography variant={'h3'}>Your subscription costs:</Typography>
        <Card>
          <RadioGroupRoot {...args}>
            <RadioGroupItem value={'day'}>$10 per 1 Day</RadioGroupItem>
            <RadioGroupItem value={'week'}>$50 per 7 Day</RadioGroupItem>
            <RadioGroupItem value={'month'}>$100 per month</RadioGroupItem>
            <RadioGroupItem disabled value={'year'}>
              $799 per year
            </RadioGroupItem>
          </RadioGroupRoot>
        </Card>
      </div>
    )
  },
}
