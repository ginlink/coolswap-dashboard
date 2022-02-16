import { Paper, Stack, Typography } from '@mui/material'
import React from 'react'

export default function EmptyList({ ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Empty
      </Typography>
    </Paper>
  )
}
