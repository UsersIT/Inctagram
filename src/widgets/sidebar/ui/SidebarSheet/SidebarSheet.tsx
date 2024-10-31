import React from 'react'

import { LogoutButton } from '@/src/features/auth'
import { Close } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { Button, ScrollArea } from '@/src/shared/ui'
import * as Sheet from '@radix-ui/react-dialog'

import sidebarStyles from '../Sibebar/Sidebar.module.scss'
import s from './SidebarSheet.module.scss'

import { generateSidebarNavItems } from '../../model/consts/navItems'
import { NavItem } from '../NavItem/NavItem'

type Props = {
  onOpenChange: (open: boolean) => void
  open: boolean
  profileId: number
}
export const SidebarSheet: React.FC<Props> = ({ onOpenChange, open, profileId }) => {
  const { t } = useTranslation()

  return (
    <Sheet.Root onOpenChange={onOpenChange} open={open}>
      <Sheet.Overlay className={s.overlay} />
      <Sheet.Content className={s.content}>
        <ScrollArea className={sidebarStyles.scrollArea}>
          <menu className={sidebarStyles.menu}>
            <ul className={sidebarStyles.navList} role={'menu'}>
              {generateSidebarNavItems(profileId).map(navItem => (
                <NavItem
                  activeIcon={navItem.activeIcon}
                  className={navItem.className ? sidebarStyles[navItem.className] : ''}
                  collapsed={false}
                  icon={navItem.icon}
                  key={navItem.label}
                  label={t.navigation[navItem.label]}
                  path={navItem.path}
                />
              ))}
            </ul>
            <LogoutButton className={sidebarStyles.logoutBtn} />
          </menu>
        </ScrollArea>
        <Sheet.Close asChild>
          <Button className={s.closeBtn} variant={'text'}>
            <Close />
          </Button>
        </Sheet.Close>
      </Sheet.Content>
    </Sheet.Root>
  )
}
