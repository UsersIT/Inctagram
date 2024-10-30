import { ComponentProps, FC, JSX } from 'react'

import { routes } from '@/src/shared/constants/routes'
import { Typography } from '@/src/shared/ui'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './NavItem.module.scss'

type Props = {
  activeIcon?: JSX.Element
  collapsed?: boolean
  icon: JSX.Element
  label: string
  path: string
} & ComponentProps<'li'>

export const NavItem: FC<Props> = props => {
  const { activeIcon, className, collapsed = false, icon, label, path } = props
  const { asPath } = useRouter()

  const title = collapsed ? label : undefined
  const isActive = asPath === path

  return (
    <li className={clsx(s.root, className)} data-collapsed={collapsed} role={'menuitem'}>
      <Link className={s.link} data-active={isActive} href={path} title={title}>
        {isActive ? activeIcon || icon : icon}
        <Typography as={'span'} className={s.label}>
          {label}
        </Typography>
      </Link>
    </li>
  )
}
