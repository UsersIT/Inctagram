import React from 'react'

import { type Post, PublicPost } from '@/src/entities/post'
import { useTranslation } from '@/src/shared/hooks'
import { Card, Typography } from '@/src/shared/ui'

import s from './PublicPage.module.scss'

import { getTotalCountPanel } from '../../model/utils/getTotalCountPanel'

export type PublicPageProps = {
  posts: Post[]
  totalUsers: number
}
export const PublicPage: React.FC<PublicPageProps> = ({ posts, totalUsers }) => {
  const { t } = useTranslation()

  const totalCountPanel = getTotalCountPanel(totalUsers)

  return (
    <div className={s.page}>
      <Card className={s.usersCountContainer}>
        <Typography aria-describedby={'totalCount'} as={'h1'} className={s.title} variant={'h2'}>
          {t.pages.home.title}
        </Typography>
        <div aria-label={`${totalUsers}`} className={s.totalCountPanel} id={'totalCount'}>
          {totalCountPanel.map((item, idx) => (
            <div className={s.countItemContainer} key={idx}>
              <Typography aria-hidden as={'span'} className={s.countItem} variant={'h2'}>
                {item}
              </Typography>
            </div>
          ))}
        </div>
      </Card>

      <ul className={s.postsContainer}>
        {posts.map(post => (
          <li key={post.id}>
            <PublicPost post={post} />
          </li>
        ))}
      </ul>
    </div>
  )
}

