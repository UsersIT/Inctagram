import React from 'react'

import { useTranslation } from '@/src/shared/hooks'
import clsx from 'clsx'

import s from './Bottombar.module.scss'

import { generateBottombarNavItems } from '../../model/consts/navItems'
import { NavItem } from '../NavItem/NavItem'

type Props = {
  profileId: number
} & React.ComponentProps<'div'>
export const Bottombar: React.FC<Props> = ({ className, profileId }) => {
  const { t } = useTranslation()

  return (
    <div className={clsx(className, s.root)}>
      <menu>
        <ul className={s.menu} role={'menu'}>
          {generateBottombarNavItems(profileId).map(navItem => (
            <NavItem
              activeIcon={navItem.activeIcon}
              collapsed
              icon={navItem.icon}
              key={navItem.label}
              label={t.navigation[navItem.label]}
              path={navItem.path}
            />
          ))}
        </ul>
      </menu>
    </div>
  )
}
