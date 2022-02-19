import * as React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { Web3ReactProvider } from '@web3-react/core'
import getLibrary from './utils/getLibrary'
import { Provider as ReduxProvider } from 'react-redux'
import store from './state'
import ApplicationUpdater from './state/application/updater'

// scroll bar
import 'simplebar/src/simplebar.css'
import { HelmetProvider } from 'react-helmet-async'

function Updater() {
  return (
    <>
      <ApplicationUpdater />
    </>
  )
}

ReactDOM.render(
  <HelmetProvider>
    <ReduxProvider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <HashRouter>
          <Updater />
          <App />
        </HashRouter>
      </Web3ReactProvider>
    </ReduxProvider>
  </HelmetProvider>,
  document.getElementById('root')
)
