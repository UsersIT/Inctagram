import React, { useEffect, useRef, useState } from 'react'

import { useTranslation } from '@/src/shared/hooks'
import { Typography } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './PostDescription.module.scss'

type Props = {
  description: string
  userName: string
} & React.ComponentProps<'div'>

export const PostDescription: React.FC<Props> = ({ className, description, userName, ...rest }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const { t } = useTranslation()

  const descriptionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (descriptionRef.current) {
      setShowMore(descriptionRef.current.clientHeight !== descriptionRef.current.scrollHeight)
    }
  }, [])

  return (
    <div className={clsx(s.container, className)} {...rest}>
      <Typography
        className={clsx(s.description, isDescriptionExpanded && s.expand)}
        ref={descriptionRef}
      >
        <Typography as={'span'} variant={'h3'}>
          {userName}
        </Typography>
        {description}
      </Typography>
      {showMore && (
        <Typography
          as={'button'}
          className={s.showMoreButton}
          onClick={() => setIsDescriptionExpanded(prev => !prev)}
          variant={'regular-link'}
        >
          {isDescriptionExpanded ? t.buttons.hide : t.buttons.showMore}
        </Typography>
      )}
    </div>
  )
}
