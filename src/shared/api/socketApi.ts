import { Socket, io } from 'socket.io-client'

import { tokenStorage } from '../storage'

let socket: Socket | null

const createSocket = (): Socket | null => {
  if (typeof window !== 'undefined') {
    const token = tokenStorage.getToken()
    const queryParams = {
      query: {
        accessToken: token,
      },
    }

    socket = io('https://inctagram.work', queryParams)
  }

  return socket
}

export const getSocket = (): Socket | null => {
  if (!socket) {
    return createSocket()
  }

  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
