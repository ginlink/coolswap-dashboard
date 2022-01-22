import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Test from './pages/Test'

export default function App() {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
    </Routes>
  )
}
