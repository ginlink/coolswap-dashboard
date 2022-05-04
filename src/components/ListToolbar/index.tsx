import { Box, InputAdornment, OutlinedInput, Toolbar } from '@mui/material'
import React from 'react'
import styled from 'styled-components/macro'
import searchFill from '@iconify/icons-eva/search-fill'
import { Icon } from '@iconify/react'
import { t } from '@lingui/macro'

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}))

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}))

export default function ListToolbar({
  filterValue,
  onFilterValue,
}: {
  filterValue: string
  onFilterValue: (value: string) => void
}) {
  return (
    <RootStyle>
      <SearchStyle
        value={filterValue}
        onChange={(e) => onFilterValue(e.target.value)}
        placeholder={`Search ...`}
        startAdornment={
          <InputAdornment position="start">
            <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        }
      />
      {/* <Tooltip title="Filter list">
        <IconButton>
          <Icon icon={roundFilterList} />
        </IconButton>
      </Tooltip> */}
    </RootStyle>
  )
}
