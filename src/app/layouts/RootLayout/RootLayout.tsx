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

  const content = meData ? (
    <>
      <div className={s.wrapper}>
        <Sidebar profileId={meData.userId} />
        <ScrollArea className={s.scrollArea}>
          <main className={s.pageOffset}>{children}</main>
          <ScrollBar orientation={'horizontal'} />
        </ScrollArea>
      </div>
      <Bottombar profileId={meData.userId} />
    </>
  ) : (
    <div className={s.wrapper}>
      <ScrollArea className={s.scrollArea}>
        <main>{children}</main>
        <ScrollBar orientation={'horizontal'} />
      </ScrollArea>
    </div>
  )

  return (
    <div className={s.root}>
      <Header isAuth={!!meData} isLoading={isLoading} />
      {content}
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
