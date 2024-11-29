import type { FC, ReactElement, ReactNode } from 'react'

import { useMeQuery } from '@/src/features/auth'
import { ScrollArea, ScrollBar } from '@/src/shared/ui'
import { Header } from '@/src/widgets/header'
import { Bottombar, Sidebar } from '@/src/widgets/sidebar'

import s from './RootLayout.module.scss'

type Props = {
  children: ReactNode
}

const RootLayout = ({ children }: Props) => {
  const { data: meData, isLoading } = useMeQuery()

  return (
    <div className={s.root}>
      <Header isAuth={!!meData} isLoading={isLoading} />
      <div className={s.wrapper}>
        {!!meData && !isLoading && <Sidebar profileId={meData.userId} />}
        <ScrollArea className={s.scrollArea}>
          <main className={s.pageOffset}>{children}</main>
          <ScrollBar orientation={'horizontal'} />
        </ScrollArea>
      </div>
      {!!meData && !isLoading && <Bottombar profileId={meData.userId} />}
    </div>
  )
}

export const withRootLayout = <P extends Record<string, unknown>>(Component: FC<P>) => {
  return function withRootLayoutComponent(props: P): ReactElement {
    return (
      <RootLayout>
        <Component {...props} />
      </RootLayout>
    )
  }
}
