import React, { useEffect } from 'react'
import PopTips from './components/PopTips'
import Web3ReactManager from './components/Web3ReactManager'
import Router from './Routes'
import { useUserLocaleManager } from './state/user/hooks'
import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'

export default function App() {
  const [local, setDefaultLocal] = useUserLocaleManager()

  // set default local
  useEffect(() => {
    !local && setDefaultLocal('en-US')
  }, [local, setDefaultLocal])

  return (
    <Web3ReactManager>
      <ThemeConfig>
        <GlobalStyles />
        <PopTips />
        <Router />
      </ThemeConfig>
    </Web3ReactManager>
  )
}
