import PropTypes from 'prop-types'
import { ReactNode, useMemo } from 'react'
// material
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles'
//
import shape from './shape'
import palette from './palette'
import typography from './typography'
import componentsOverride from './overrides'
import shadows, { customShadows } from './shadows'
import React from 'react'

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node,
}

export default function ThemeConfig({ children }: { children: ReactNode }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows,
    }),
    []
  ) as any

  const theme = createTheme(themeOptions)
  theme.components = componentsOverride(theme)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
