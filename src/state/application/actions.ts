import { createAction } from '@reduxjs/toolkit'
import { PopTip } from './reducer'

export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>('application/updateBlockNumber')
export const updatePopTip = createAction<PopTip>('application/updatePopTip')
