import { AlertColor } from '@mui/material'
import { createReducer } from '@reduxjs/toolkit'
import { updateBlockNumber, updatePopTip } from './actions'

export type PopTip = {
  open: boolean
  message: string
  autoHideDuration: number
  severity: AlertColor
}
export interface ApplicationState {
  readonly blockNumber: { readonly [chainId: number]: number }
  readonly popTip: PopTip
}

const initialState: ApplicationState = {
  blockNumber: {},
  popTip: {
    open: false,
    message: '',
    autoHideDuration: 3000,
    severity: 'success',
  },
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    })
    .addCase(updatePopTip, (state, action) => {
      state.popTip = action.payload
    })
)
