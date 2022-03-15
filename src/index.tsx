import * as React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { Web3ReactProvider } from '@web3-react/core'
import getLibrary from './utils/getLibrary'
import { Provider as ReduxProvider } from 'react-redux'
import store from './state'
import ApplicationUpdater from './state/application/updater'
import HttpUpdater from './state/http/updater'
import { SnackbarProvider } from 'notistack'

// scroll bar
import 'simplebar/src/simplebar.css'
import { HelmetProvider } from 'react-helmet-async'

function Updater() {
  return (
    <>
      <ApplicationUpdater />
      <HttpUpdater />
    </>
  )
}

ReactDOM.render(
  <HelmetProvider>
    <ReduxProvider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <HashRouter>
            <Updater />
            <App />
          </HashRouter>
        </SnackbarProvider>
      </Web3ReactProvider>
    </ReduxProvider>
  </HelmetProvider>,
  document.getElementById('root')
)
