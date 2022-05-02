/**
 * List of all the networks supported by the Uniswap Interface
 */
export enum SupportedChainId {
  EVMOS_TEST = 9000,
  BSC = 56,
  BSC_TEST = 97,
  RINKEBY = 4,
  HUOBI_TEST = 256,
  KCC = 321,
  KCC_TEST = 322,
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
  [SupportedChainId.RINKEBY]: 'RINKEBY',
  [SupportedChainId.BSC_TEST]: 'BSC_TEST',
  [SupportedChainId.KCC_TEST]: 'KCC_TEST',
  [SupportedChainId.HUOBI_TEST]: 'HUOBI_TEST',
}

/**
 * All the chain IDs that are running the Ethereum protocol.
 */
export const L1_CHAIN_IDS = [
  SupportedChainId.RINKEBY,
  SupportedChainId.BSC_TEST,
  SupportedChainId.KCC_TEST,
  SupportedChainId.HUOBI_TEST,
] as const

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number]

/**
 * Controls some L2 specific behavior, e.g. slippage tolerance, special UI behavior.
 * The expectation is that all of these networks have immediate transaction confirmation.
 */
export const L2_CHAIN_IDS = [] as const

export type SupportedL2ChainId = typeof L2_CHAIN_IDS[number]
