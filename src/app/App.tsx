import type { NextPageWithLayout } from '@/src/shared/types/next'
import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { Inter } from 'next/font/google'

import { wrapper } from './providers/store'
import { ToastProvider } from './providers/toasts'

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
        <Provider store={store}>{getLayout(<Component {...props.pageProps} />)}</Provider>
      </GoogleOAuthProvider>
      <ToastProvider />
    </>
  )
}
