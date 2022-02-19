import React from 'react'
import PopTips from './components/PopTips'
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
        <PopTips />
      </ThemeConfig>
    </Web3ReactManager>
  )
}
