/**
 * List of all the networks supported by the Uniswap Interface
 */
export enum SupportedChainId {
  EVMOS_TEST = 9000,
}

/**
 * Array of all the supported chain IDs
 */
export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
  (id) => typeof id === 'number'
) as SupportedChainId[]

export const NETWORK_LABELS: { [chainId in SupportedChainId | number]: string } = {
  [SupportedChainId.EVMOS_TEST]: 'EVMOS_TEST',
}
