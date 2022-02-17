import * as React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { Web3ReactProvider } from '@web3-react/core'
import getLibrary from './utils/getLibrary'

// scroll bar
import 'simplebar/src/simplebar.css'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.render(
  <HelmetProvider>
    <Web3ReactProvider getLibrary={getLibrary}>
      <HashRouter>
        <App />
      </HashRouter>
    </Web3ReactProvider>
  </HelmetProvider>,
  document.getElementById('root')
)
