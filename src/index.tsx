import * as React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { HashRouter } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'

ReactDOM.render(
  <React.Fragment>
    <HashRouter>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Dashboard />
    </HashRouter>
  </React.Fragment>,
  document.getElementById('root')
)
