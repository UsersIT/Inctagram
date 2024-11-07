import { useState } from 'react'

import { useIntersection, useTranslation } from '@/src/shared/hooks'
import { Popover, ScrollArea, Typography } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './NotificationsPopover.module.scss'

import { useGetNotificationsQuery, useMarkAsReadMutation } from '../../api/notificationsApi'
import { getUnreadNotificationsIds } from '../../model/utils/getUnreadNotificationsIds'
import { NotificationCard } from '../NotificationCard/NotificationCard'
import { PopoverTrigger } from '../PopoverTrigger/PopoverTrigger'

export const NotificationsPopover = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [cursor, setCursor] = useState<null | number>(null)
  const { t } = useTranslation()

  const { data, isLoading } = useGetNotificationsQuery({ cursor })
  const [markAsRead] = useMarkAsReadMutation()

  const unreadCount = data?.items?.filter(item => !item.isRead).length || null

  const handleMarkAsRead = async () => {
    if (data?.items) {
      const ids = getUnreadNotificationsIds(data.items)

      if (ids.length > 0) {
        await markAsRead({ ids }).unwrap()
      }
    }
  }

  const handleLoadMore = () => {
    if (data?.items && data.items.length) {
      const lastNotificationtIdx = data.items.length - 1
      const cursor = data.items[lastNotificationtIdx].id

      setCursor(cursor)
    }
  }

  const hasMoreNotifications = (data && data.items && data.totalCount > data.items.length) || false
  const lastNotificationRef = useIntersection<HTMLLIElement>(
    handleLoadMore,
    isLoading,
    hasMoreNotifications
  )

  const contentClassName = clsx(s.content, data?.items?.length === 0 && s.empty)

  return (
    <Popover
      alignOffset={0}
      arrow
      className={s.root}
      onCloseAutoFocus={handleMarkAsRead}
      onOpenChange={setIsOpen}
      open={isOpen}
      sideOffset={0}
      trigger={<PopoverTrigger count={unreadCount} isOpen={isOpen} />}
    >
      <div className={contentClassName}>
        <Typography className={s.title} variant={'h2'}>
          {t.notifications.title}
        </Typography>
        {data?.items && data.items.length > 0 ? (
          <ScrollArea className={s.scrollArea}>
            <ul aria-label={t.notifications.title}>
              {data.items.map((notification, idx) => (
                <li
                  aria-label={`${t.notifications.newNotification} ${idx + 1}`}
                  className={s.notification}
                  key={notification.id}
                  ref={idx === data?.items!.length - 1 ? lastNotificationRef : null}
                >
                  <NotificationCard notification={notification}>
                    {notification.message}
                  </NotificationCard>
                </li>
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <Typography className={s.noNotifications} variant={'regular-text-14'}>
            {t.notifications.noNotifications}
          </Typography>
        )}
      </div>
    </Popover>
  )
}
