import { useMeQuery } from '@/src/features/auth'
import { Spinner } from '@/src/shared/ui'

import s from './HomePage.module.scss'

import { PublicContent } from '../PublicContent/PublicContent'

export const HomePage = () => {
  const { data: meData, isLoading } = useMeQuery()

  if (isLoading) {
    return (
      <div className={s.page}>
        <Spinner />
      </div>
    )
  }

  return <>{meData && !isLoading ? <div>Comming soon...</div> : <PublicContent />}</>
}
