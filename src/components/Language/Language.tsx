import useParsedQueryString from '@/hooks/useParsedQueryString'
import { Icon } from '@iconify/react'
import { Box, Menu, MenuItem, styled } from '@mui/material'
import { stringify } from 'querystring'
import React, { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { languages } from './data'
import { LanguageItem } from './types'

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

export function LanguageMenu({
  anchorEl,
  open,
  languages,
  onSwitch,
  onDismiss,
}: {
  anchorEl: Element | ((element: Element) => Element) | null | undefined
  open: boolean
  languages: LanguageItem[]
  onSwitch?: (language: LanguageItem) => void
  onDismiss?: () => void
}) {
  const qs = useParsedQueryString()
  const location = useLocation()

  const target = useCallback(
    (targetLocale: string) => {
      return {
        ...location,
        search: stringify({ ...qs, lng: targetLocale }),
      }
    },
    [location, qs]
  )

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onDismiss}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {languages.map((item, i) => {
        return (
          <StyledLink key={i} onClick={() => onSwitch && onSwitch(item)} to={target(item.lng)}>
            <MenuItem>{item.label}</MenuItem>
          </StyledLink>
        )
      })}
    </Menu>
  )
}

export default function Language() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSwitch = () => {
    handleClose()
  }

  return (
    <Box sx={{ cursor: 'pointer' }}>
      <Box onClick={handleClick}>
        <Icon icon={'fa6-solid:language'} />
      </Box>

      <LanguageMenu
        anchorEl={anchorEl}
        open={open}
        languages={languages}
        onDismiss={handleClose}
        onSwitch={handleSwitch}
      />
    </Box>
  )
}
