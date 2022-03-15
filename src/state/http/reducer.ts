import { FaucetListItem } from '@/services/api'
import { TokenListItem } from '@/services/token'
import { createReducer } from '@reduxjs/toolkit'
import { setFaucetList, setTokenList } from './actions'

export interface HttpState {
  faucetList: FaucetListItem[] | undefined
  tokenList: TokenListItem[] | undefined
}

export const initialState: HttpState = {
  faucetList: undefined,
  tokenList: undefined,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setFaucetList, (state, { payload: { list } }) => {
      state.faucetList = list
    })
    .addCase(setTokenList, (state, { payload: { list } }) => {
      state.tokenList = list
    })
)
