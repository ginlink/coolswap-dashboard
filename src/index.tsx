import * as React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import { HashRouter } from 'react-router-dom'

ReactDOM.render(
  <React.Fragment>
    <HashRouter>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </HashRouter>
  </React.Fragment>,
  document.getElementById('root')
)
