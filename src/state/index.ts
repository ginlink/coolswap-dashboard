import { configureStore } from '@reduxjs/toolkit'

import application from './application/reducer'
import http from './http/reducer'

const store = configureStore({
  reducer: {
    application,
    http,
  },
})

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
