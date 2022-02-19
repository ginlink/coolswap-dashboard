import { Icon } from '@iconify/react'
// import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill'
import peopleFill from '@iconify/icons-eva/people-fill'
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill'
import React, { ReactNode } from 'react'

// ----------------------------------------------------------------------

export type SideBarItem = {
  title: string
  path: string
  icon: any
  info: ReactNode
  children: SideBarItem[]
}

const getIcon = (name: any) => <Icon icon={name} width={22} height={22} />

const sidebarConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon(pieChart2Fill),
  // },
  {
    title: 'Faucet',
    path: '/dashboard/token/receive',
    icon: getIcon(peopleFill),
  },
  {
    title: 'Tokens',
    path: '/dashboard/token/create',
    icon: getIcon(shoppingBagFill),
  },
]

export default sidebarConfig
