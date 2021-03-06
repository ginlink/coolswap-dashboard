import { Icon } from '@iconify/react'
// import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill'
// import peopleFill from '@iconify/icons-eva/people-fill'
// import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill'
import React, { ReactNode } from 'react'
import { t, Trans } from '@lingui/macro'

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
    title: <Trans>Faucet</Trans>,
    path: '/dashboard/token/receive',
    icon: getIcon('fa-solid:faucet'),
  },
  {
    title: <Trans>Tokens</Trans>,
    path: '/dashboard/token/create',
    icon: getIcon('ic:round-generating-tokens'),
  },
  {
    title: <Trans>Calculator</Trans>,
    path: '/dashboard/calculator',
    icon: getIcon('akar-icons:calculator'),
  },
]

export default sidebarConfig
