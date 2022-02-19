import http from './index'

export type TokenListItem = {
  id: number
  chain_id: number
  address: string
  decimals: number
  symbol: string
  total: string
  creator: string
  created_at?: string
  updated_at?: string
}

export function createTokenApi(props: Omit<TokenListItem, 'id' | 'created_at' | 'updated_at'>) {
  return http.post('/token', props) as Promise<any>
}
export function deleteTokenApi(id: number) {
  return http.delete(`/token/${id}`) as Promise<any>
}
export function tokenListApi() {
  return http.get('/token') as Promise<TokenListItem[]>
}
