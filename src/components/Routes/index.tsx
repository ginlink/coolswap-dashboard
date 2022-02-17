import Call from '@/pages/Call'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import Test from '@/pages/Test'
import CreateToken from '@/pages/Token/Create'
import ReceiveToken from '@/pages/Token/Receive'

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/home" element={<Home />} />
      <Route path="/call" element={<Call />} />
      <Route path="/token">
        <Route path="create" element={<CreateToken />} />
        <Route path="receive" element={<ReceiveToken />} />
      </Route>

      <Route path="*" element={<Navigate replace to="/home" />} />
    </Routes>
  )
}
