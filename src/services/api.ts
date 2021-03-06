import http from './index'
import { TransactionResponse } from '@ethersproject/providers'

export type FaucetListItem = {
  id: number
  chain_id: number
  address: string
  symbol: string
  left_amount: string
  left_native: string
  admin: string
}

// example api
export function example() {
  return http.get('/example') as Promise<any>
}

export function faucetListApi() {
  return http.get('/faucet') as Promise<FaucetListItem[]>
}

export function receiveTokenApi(receive: string, token_address: string, amount: string) {
  return http.post('/faucet/transfer', {
    receive,
    token_address,
    amount,
  }) as Promise<TransactionResponse>
}
export function createReceiveTokenApi(chain_id: string, address: string, private_key: string) {
  return http.post('/faucet', {
    chain_id,
    address,
    private_key,
  }) as Promise<any>
}
export function deleteReceiveTokenApi(id: number, private_key: string) {
  return http.delete(`/faucet/${id}`, { private_key }) as Promise<any>
}
