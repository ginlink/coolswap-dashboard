import { InjectedConnector } from '@web3-react/injected-connector'

import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from '../constants/chains'
type RpcMap = {
  [chainId: number]: string
}

export const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
})

export const RPC_URL: RpcMap = {
  [SupportedChainId.EVMOS_TEST]: 'https://ethereum.rpc.evmos.dev',
}
