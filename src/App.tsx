import React from 'react'
import Dashboard from './components/Dashboard/Dashboard'
import Web3ReactManager from './components/Web3ReactManager'
import Router from './Routes'
import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'

export default function App() {
  return (
    <Web3ReactManager>
      <ThemeConfig>
        <GlobalStyles />
        <Router />
      </ThemeConfig>
    </Web3ReactManager>
  )
}
