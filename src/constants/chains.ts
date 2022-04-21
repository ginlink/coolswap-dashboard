/**
 * List of all the networks supported by the Uniswap Interface
 */
export enum SupportedChainId {
  EVMOS_TEST = 9000,
  BSC = 56,
  BSC_TEST = 97,
  RINKEBY_TEST = 4,
  HUOBI_TEST = 256,
  KCC = 321,
  KCC_TEST = 322,
  MAIN = 1,
}

export const DEFAULT_CHAIN: {
  chainId: SupportedChainId
  chainName: string
  rpcUrls: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: 18
  }
} = {
  chainId: SupportedChainId.EVMOS_TEST,
  chainName: '',
  rpcUrls: '',
  nativeCurrency: {
    name: '',
    symbol: '',
    decimals: 18,
  },
}

/**
 * Array of all the supported chain IDs
 */
export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
  (id) => typeof id === 'number'
) as SupportedChainId[]

export const NETWORK_LABELS: { [chainId in SupportedChainId | number]: string } = {
  [SupportedChainId.EVMOS_TEST]: 'EVMOS_TEST',
  [SupportedChainId.HUOBI_TEST]: 'Huobi_TEST',
}
