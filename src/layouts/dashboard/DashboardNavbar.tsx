import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import menu2Fill from '@iconify/icons-eva/menu-2-fill'
import walletOutlined from '@iconify/icons-ant-design/wallet-outlined'
// material
import { alpha, styled } from '@mui/material/styles'
import { Box, Stack, AppBar, Toolbar, IconButton, Button, Typography } from '@mui/material'
// components
import { MHidden } from '../../components/@material-extend'
//
// import Searchbar from './Searchbar'
// import AccountPopover from './AccountPopover'
// import LanguagePopover from './LanguagePopover'
// import NotificationsPopover from './NotificationsPopover'
import React from 'react'
import { useActiveWeb3React } from '@/hooks/web3'
import { shortenAddress } from '@/utils'

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280
const APPBAR_MOBILE = 64
const APPBAR_DESKTOP = 92

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
  const { account } = useActiveWeb3React()

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

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <Box sx={{ p: 2, pt: 1.5 }}>
            {account ? (
              <Button fullWidth color="inherit" variant="outlined">
                <Stack direction="row" alignItems="center">
                  <Icon icon={walletOutlined} width={20} height={20} />
                  <Typography variant="body1">{shortenAddress(account)}</Typography>
                </Stack>
              </Button>
            ) : (
              <Button fullWidth color="inherit" variant="outlined">
                <Typography variant="body1">connect to wallet</Typography>
              </Button>
            )}
          </Box>
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  )
}
