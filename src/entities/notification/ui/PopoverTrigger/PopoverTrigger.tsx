import React, { forwardRef } from 'react'

import { BellFilled, BellOutline } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './PopoverTrigger.module.scss'

type Props = {
  className?: string
  count: number
  isOpen: boolean
} & React.ComponentPropsWithoutRef<'button'>

export const PopoverTrigger: React.FC<Props> = forwardRef<React.ElementRef<'button'>, Props>(
  ({ className, count, isOpen, ...rest }, ref) => {
    const displayCount = count > 0 && !isOpen

    const { t } = useTranslation()

    return (
      <Button
        aria-label={t.notifications.title}
        className={clsx(s.notificationsBtn, isOpen && s.filled, className)}
        ref={ref}
        variant={'text'}
        {...rest}
      >
        {isOpen ? <BellFilled /> : <BellOutline />}
        {displayCount && <span className={s.notificationCount}>{count}</span>}
      </Button>
    )
  }
)

PopoverTrigger.displayName = 'PopoverTrigger'
