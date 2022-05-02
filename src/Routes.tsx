import { Navigate, useRoutes } from 'react-router-dom'
// layouts
import DashboardLayout from './layouts/dashboard'
import LogoOnlyLayout from './layouts/LogoOnlyLayout'
//
import Login from './pages/Login'
import NotFound from './pages/Page404'
import React from 'react'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import { CreateToken, ReceiveToken } from './pages/Token'

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <Home /> },
        {
          path: 'token',
          children: [
            { path: 'receive', element: <ReceiveToken /> },
            { path: 'create', element: <CreateToken /> },
          ],
        },
        {
          path: 'calculator',
          element: <Calculator />,
        },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      // element: <DashboardLayout />,
      children: [
        { path: 'login', element: <Login /> },
        // { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        // { path: '', element: <Navigate to="/dashboard" /> },
        { path: '', element: <Navigate to="/dashboard/token/receive" /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ])
}
