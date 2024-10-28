import {
  Bookmark,
  BookmarkOutline,
  Home,
  HomeOutline,
  MessageCircle,
  MessageCircleOutline,
  Person,
  PersonOutline,
  PlusSquare,
  PlusSquareOutline,
  SearchIcon,
  TrendingUp,
} from '@/src/shared/assets/icons'
import { routes } from '@/src/shared/constants/routes'

import { NavItem } from '../types/navItem'

type NavItems = {
  create: (profileId: number) => NavItem
  favorites: NavItem
  home: NavItem
  messenger: NavItem
  profile: (profileId: number) => NavItem
  search: NavItem
  statistics: NavItem
}

export const navItems: NavItems = {
  create: (profileId: number): NavItem => ({
    activeIcon: <PlusSquare />,
    icon: <PlusSquareOutline />,
    label: 'create',
    path: routes.CREATE(profileId),
  }),
  favorites: {
    activeIcon: <Bookmark />,
    icon: <BookmarkOutline />,
    label: 'favorites',
    path: routes.FAVORITES,
  },
  home: {
    activeIcon: <Home />,
    icon: <HomeOutline />,
    label: 'home',
    path: routes.HOME,
  },
  messenger: {
    activeIcon: <MessageCircle />,
    icon: <MessageCircleOutline />,
    label: 'messenger',
    path: routes.MESSENGER,
  },
  profile: (profileId: number): NavItem => ({
    activeIcon: <Person />,
    icon: <PersonOutline />,
    label: 'myProfile',
    path: routes.PROFILE(profileId),
  }),
  search: {
    className: 'gap',
    icon: <SearchIcon height={24} width={24} />,
    label: 'search',
    path: routes.SEARCH,
  },
  statistics: {
    icon: <TrendingUp />,
    label: 'statistics',
    path: routes.STATISTICS,
  },
}

export const generateSidebarNavItems = (profileId: number): NavItem[] => [
  navItems.home,
  navItems.create(profileId),
  navItems.profile(profileId),
  navItems.messenger,
  navItems.search,
  navItems.statistics,
  navItems.favorites,
]

export const generateBottombarNavItems = (profileId: number): NavItem[] => [
  navItems.home,
  navItems.create(profileId),
  navItems.messenger,
  { ...navItems.search, className: undefined },
  navItems.profile(profileId),
]
