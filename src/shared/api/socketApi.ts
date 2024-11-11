import { Socket, io } from 'socket.io-client'

import { tokenStorage } from '../storage'

let socket: Socket

const createSocket = () => {
  if (typeof window !== 'undefined') {
    const queryParams = {
      query: {
        accessToken: tokenStorage.getToken(),
      },
    }

    socket = io('https://inctagram.work', queryParams)
  }

  return socket
}

export const getSocket = () => {
  if (!socket) {
    return createSocket()
  }

  return socket
}
