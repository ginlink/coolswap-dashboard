import { computeNumUnitAdapter } from '@/utils/formatNum'
import { Stack, Typography } from '@mui/material'
import { alpha, useTheme, styled } from '@mui/material/styles'
import React from 'react'

const Wrapper = styled('div')(({ theme }: { theme: any }) => ({
  // position: 'relative',
  padding: '24px 24px',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.grey[500_32]}`,

  // '&:before': {
  //   backgroundColor: theme.palette.grey[600],
  // },

  // '&::before': {
  //   // position: 'absolute',
  //   content: '',
  //   width: '2px',
  //   height: '100%',
  //   backgroundColor: 'yellow',
  // },
}))

export default function DatePanel({
  label,
  value,
  rate0,
  rate1,
  rate1_price,
}: {
  label: string | undefined
  value: string | undefined
  rate0?: string
  rate1?: string
  rate1_price?: string
}) {
  return (
    <Wrapper>
      <Stack spacing={2}>
        <Typography variant={'subtitle1'}>{label}</Typography>
        <Stack direction={'row'} alignItems={'flex-end'} spacing={1}>
          <Typography variant={'h4'}>${value}</Typography>

          {(rate0 || rate1) && (
            <Typography variant={'caption'}>
              ({rate0}%, {rate1}% = {rate1_price})
            </Typography>
          )}
        </Stack>
      </Stack>
    </Wrapper>
  )
}
