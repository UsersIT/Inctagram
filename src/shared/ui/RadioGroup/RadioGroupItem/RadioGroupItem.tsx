import { Typography } from '@/src/shared/ui'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { RadioGroupItemProps } from '@radix-ui/react-radio-group'
import cn from 'clsx'

import s from './RadioGroupItem.module.scss'

type Props = RadioGroupItemProps

export const RadioGroupItem = ({ children, className, value, ...props }: Props) => {
  return (
    <label className={s.wrapper} htmlFor={value}>
      <RadioGroup.Item className={cn(s.item, className)} id={value} value={value} {...props}>
        <RadioGroup.Indicator className={s.indicator} />{' '}
      </RadioGroup.Item>
      <Typography className={s.label} variant={'regular-text-14'}>
        {children}
      </Typography>
    </label>
  )
}
