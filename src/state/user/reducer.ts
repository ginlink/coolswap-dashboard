import { createReducer } from '@reduxjs/toolkit'
import { updateUserLocale } from './actions'
import { SupportedLocale } from '@/constants/locales'

const currentTimestamp = () => new Date().getTime()

export interface UserState {
  // the timestamp of the last updateVersion action
  lastUpdateVersionTimestamp?: number

  userLocale: SupportedLocale | null

  timestamp: number
}

export const initialState: UserState = {
  userLocale: null,
  timestamp: currentTimestamp(),
}

export default createReducer(initialState, (builder) =>
  builder.addCase(updateUserLocale, (state, action) => {
    state.userLocale = action.payload.userLocale
    state.timestamp = currentTimestamp()
  })
)
