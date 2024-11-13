import React from 'react'

import { Dots, Edit, Trash } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { Avatar, DropdownMenu, Typography } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './PostHeader.module.scss'

type PostHeaderProps = {
  avatarUrl: string
  className: string
  isDropdownOpen: boolean
  isEditMode: boolean
  isMyProfile: boolean
  onDeleteClick: () => void
  onDropdownOpenChange: (open: boolean) => void
  onEditClick: () => void
  userName: string
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  avatarUrl,
  className,
  isDropdownOpen,
  isEditMode,
  isMyProfile,
  onDeleteClick,
  onDropdownOpenChange,
  onEditClick,
  userName,
}) => {
  const { t } = useTranslation()

  return (
    <header className={clsx(s.avatarContainer, className)}>
      <Avatar circle height={36} iconSize={24} url={avatarUrl} width={36} />
      <Typography aria-label={userName || 'User'} as={'h3'} variant={'h3'}>
        {userName || ''}
      </Typography>
      {isMyProfile && !isEditMode && (
        <DropdownMenu
          className={s.dropdown}
          onOpenChange={onDropdownOpenChange}
          open={isDropdownOpen}
          trigger={<Dots className={s.dots} />}
        >
          <span className={s.menuItem} onClick={onEditClick}>
            <Edit /> {t.widgets.postModal.editPost}
          </span>
          <span className={clsx(s.menuItem)} onClick={onDeleteClick}>
            <Trash /> {t.widgets.postModal.deletePost}
          </span>
        </DropdownMenu>
      )}
    </header>
  )
}
