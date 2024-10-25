import { PublicPost } from '@/src/entities/post'
import { useTranslation } from '@/src/shared/hooks'
import { Card, Typography } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './PublicContent.module.scss'

import { useGetAllPostsQuery } from '../../api/publicApi'
import { getTotalCountPanel } from '../../model/utils/getTotalCountPanel'

export const PublicContent = () => {
  const { t } = useTranslation()

  const { data: posts, isLoading } = useGetAllPostsQuery()

  const totalCountPanel = getTotalCountPanel(posts?.totalUsers || 0)

  return (
    <div className={s.page}>
      <Card className={s.usersCountContainer}>
        <Typography aria-describedby={'totalCount'} as={'h1'} className={s.title} variant={'h2'}>
          {t.pages.home.title}
        </Typography>
        <div aria-label={`${posts?.totalUsers}`} className={s.totalCountPanel} id={'totalCount'}>
          {totalCountPanel.map((item, idx) => (
            <div className={s.countItemContainer} key={idx}>
              <Typography
                aria-hidden
                as={'span'}
                className={clsx(s.countItem, isLoading && s.animate)}
                variant={'h2'}
              >
                {item}
              </Typography>
            </div>
          ))}
        </div>
      </Card>

      {!isLoading && (
        <ul className={s.postsContainer}>
          {posts?.items.map(post => (
            <li key={post.id}>
              <PublicPost post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
