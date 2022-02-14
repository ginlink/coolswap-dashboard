import * as React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { Web3ReactProvider } from '@web3-react/core'
import getLibrary from './utils/getLibrary'

ReactDOM.render(
  <React.Fragment>
    <Web3ReactProvider getLibrary={getLibrary}>
      <HashRouter>
        <App />
      </HashRouter>
    </Web3ReactProvider>
  </React.Fragment>,
  document.getElementById('root')
)
