import type { NextPageWithLayout } from '@/src/shared/types/next'
import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'

import { wrapper } from '@/src/shared/store'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Inter } from 'next/font/google'

import { SocketProvider } from './providers/socket/SocketProvider'
import { ToastProvider } from './providers/toasts/ToastProvider'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export function App({ Component, ...rest }: AppPropsWithLayout) {
  const { props, store } = wrapper.useWrappedStore(rest)
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <>
      <style global jsx>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_SECRET as string}>
        <Provider store={store}>
          <SocketProvider>{getLayout(<Component {...props.pageProps} />)}</SocketProvider>
        </Provider>
      </GoogleOAuthProvider>
      <ToastProvider />
    </>
  )
}
