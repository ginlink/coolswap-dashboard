import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import menu2Fill from '@iconify/icons-eva/menu-2-fill'
import Web3NetWork from '@/components/Web3NetWork'
import React from 'react'
// material
import { alpha, styled } from '@mui/material/styles'
import { Box, AppBar, Toolbar, IconButton } from '@mui/material'
// components
import { MHidden } from '../../components/@material-extend'
//
// import Searchbar from './Searchbar'
// import AccountPopover from './AccountPopover'
// import LanguagePopover from './LanguagePopover'
// import NotificationsPopover from './NotificationsPopover'

// ----------------------------------------------------------------------

export const DRAWER_WIDTH = 280
export const APPBAR_MOBILE = 64
export const APPBAR_DESKTOP = 92

const RootStyle = styled(AppBar)(({ theme }) => ({
  color: theme.palette.grey[800],
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}))

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  borderBottom: '1px solid #eee',
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}))

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
}

export default function DashboardNavbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <RootStyle>
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Web3NetWork />
      </ToolbarStyle>
    </RootStyle>
  )
}
