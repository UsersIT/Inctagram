import * as RadioGroup from '@radix-ui/react-radio-group'
import { RadioGroupProps } from '@radix-ui/react-radio-group'
import cn from 'clsx'

import s from './RadioGroupRoot.module.scss'

type Props = RadioGroupProps

export const RadioGroupRoot = ({ children, className, orientation, ...props }: Props) => {
  return (
    <RadioGroup.Root
      className={cn(s.root, orientation === 'horizontal' ? s.horizontal : s.vertical, className)}
      {...props}
    >
      {children}
    </RadioGroup.Root>
  )
}
