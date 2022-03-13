import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import logo from '@/assets/images/cool.png'
// material
import { styled } from '@mui/material/styles'
import { Box, Drawer, Stack, Typography, useTheme } from '@mui/material'
// components
// import Logo from '../../components/Logo'
import Scrollbar from '../../components/Scrollbar'
import NavSection from '../../components/NavSection'
import { MHidden } from '../../components/@material-extend'
//
import sidebarConfig from './SidebarConfig'
// import account from '../../_mocks_/account'
import React from 'react'
import { APPBAR_DESKTOP, APPBAR_MOBILE } from './DashboardNavbar'

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}))

const LogoWrapper = styled('img')({
  height: '40px',
  borderRadius: '50%',
})

const ToolbarStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: APPBAR_MOBILE,
  borderBottom: '1px solid #eee',
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}))

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
}

export default function DashboardSidebar({
  isOpenSidebar,
  onCloseSidebar,
}: {
  isOpenSidebar: boolean
  onCloseSidebar: () => void
}) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const theme = useTheme()

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' },
      }}
    >
      <ToolbarStyle sx={{ px: 1.5, py: 1, backgroundColor: theme.palette.primary.main }}>
        <Box
          // component={RouterLink}
          // to="/"
          sx={{ display: 'flex', cursor: 'pointer' }}
        >
          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={1}>
            <LogoWrapper src={logo} />
            <Typography variant={'h5'} sx={{ color: theme.palette.common.white, textDecoration: 'none' }}>
              CoolHelper
            </Typography>
          </Stack>
        </Box>
      </ToolbarStyle>

      <NavSection navConfig={sidebarConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  )

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  )
}
