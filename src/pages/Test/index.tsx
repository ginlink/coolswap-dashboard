import React, { useEffect } from 'react'
import styled from 'styled-components/macro'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import ProTip from './ProTip'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  )
}

const Wrapper = styled.div``

export default function Test() {
  return (
    <Wrapper>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create React App example with styled-components and TypeScript
          </Typography>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </Wrapper>
  )
}
