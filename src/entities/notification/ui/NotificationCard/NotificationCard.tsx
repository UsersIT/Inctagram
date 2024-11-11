import React from 'react'

import { useTranslation } from '@/src/shared/hooks'
import { Time, Typography } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './NotificationCard.module.scss'

import { NotificationType } from '../../model/types/notification'

type Props = {
  notification: NotificationType
} & React.ComponentProps<'div'>

export const NotificationCard: React.FC<Props> = ({ className, notification, ...rest }) => {
  const { isRead, message, notifyAt } = notification
  const { t } = useTranslation()

  return (
    <div className={clsx(s.root, className)} {...rest}>
      <Typography as={'h3'} className={s.title} variant={'bold-text-14'}>
        {`${t.notifications.newNotification}! `}
      </Typography>
      {!isRead && (
        <Typography as={'small'} className={s.small} variant={'small-text'}>
          {t.notifications.new}
        </Typography>
      )}

      <Typography>{message}</Typography>
      <Time time={notifyAt} />
    </div>
  )
}
