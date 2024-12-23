import { ReactNode } from 'react'

import { useSocketConnection } from '../../hooks/useSocketConnection'

export function SocketProvider({ children }: { children: ReactNode }) {
  useSocketConnection()

  return <>{children}</>
}
