import React from 'react'
import Dashboard from './components/Dashboard/Dashboard'
import Web3ReactManager from './components/Web3ReactManager'

export default function App() {
  return (
    <Web3ReactManager>
      <Dashboard />
    </Web3ReactManager>
  )
}
