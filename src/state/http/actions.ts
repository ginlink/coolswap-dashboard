import { FaucetListItem } from '@/services/api'
import { TokenListItem } from '@/services/token'
import { createAction } from '@reduxjs/toolkit'

export const setFaucetList = createAction<{ list: FaucetListItem[] | undefined }>('http/setFaucetList')
export const setTokenList = createAction<{ list: TokenListItem[] | undefined }>('http/setTokenList')
