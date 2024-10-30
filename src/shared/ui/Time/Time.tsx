import React, { forwardRef } from 'react'

import { Typography } from '@/src/shared/ui'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import * as timeago from 'timeago.js'
import ru from 'timeago.js/lib/lang/ru'
import TimeAgo from 'timeago-react'

import s from './Time.module.scss'

timeago.register('ru', ru)

export type TimeProps = {
  /** @format date example: '2022-10-25T12:00:00.000Z' */
  time: string
} & React.ComponentPropsWithoutRef<'span'>

export const Time = forwardRef<HTMLSpanElement, TimeProps>(({ className, time, ...rest }, ref) => {
  const { locale } = useRouter()

  return (
    <Typography
      as={'span'}
      className={clsx(s.date, className)}
      id={'time'}
      ref={ref}
      variant={'small-text'}
      {...rest}
    >
      <TimeAgo datetime={time} locale={locale} />
    </Typography>
  )
})

Time.displayName = 'Time'
