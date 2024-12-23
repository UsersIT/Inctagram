import { useEffect } from 'react'

import { updateNotificationsData } from '@/src/entities/notification'
import { useMeQuery } from '@/src/features/auth'
import { disconnectSocket, getSocket } from '@/src/shared/api/socketApi'
import { socketEvents } from '@/src/shared/constants/socketEvents'
import { useAppDispatch } from '@/src/shared/store'

export const useSocketConnection = () => {
  const { data: meData } = useMeQuery()
  const dispatch = useAppDispatch()

  const updateNotifications = updateNotificationsData(dispatch)

  const connectWS = () => {
    const socket = getSocket()

    socket?.on(socketEvents.NOTIFICATIONS, updateNotifications)
  }

  useEffect(() => {
    if (meData) {
      connectWS()
    }

    return () => {
      disconnectSocket()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meData])
}
