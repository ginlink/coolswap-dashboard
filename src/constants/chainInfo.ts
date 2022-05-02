import polygonMaticLogo from '@/assets/svg/polygon-matic-logo.svg'
import ethereumLogoUrl from '@/assets/svg/polygon-matic-logo.svg'
import ms from 'ms.macro'

import { SupportedChainId, SupportedL1ChainId, SupportedL2ChainId } from './chains'

export enum NetworkType {
  L1,
  L2,
}

interface BaseChainInfo {
  readonly networkType: NetworkType
  readonly blockWaitMsBeforeWarning?: number
  readonly docs: string
  readonly bridge?: string
  readonly explorer: string
  readonly infoLink: string
  readonly logoUrl: string
  readonly label: string
  readonly helpCenterUrl?: string
  readonly nativeCurrency: {
    name: string // e.g. 'Goerli ETH',
    symbol: string // e.g. 'gorETH',
    decimals: number // e.g. 18,
  }
}

export interface L1ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L1
}

export interface L2ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L2
  readonly bridge: string
  readonly statusPage?: string
  readonly defaultListUrl: string
}

export type ChainInfoMap = { readonly [chainId: number]: L1ChainInfo | L2ChainInfo } & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo
} & { readonly [chainId in SupportedL1ChainId]: L1ChainInfo }

export const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.RINKEBY]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://rinkeby.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Rinkeby',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Rinkeby Ether', symbol: 'rETH', decimals: 18 },
  },
  [SupportedChainId.BSC_TEST]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    docs: 'https://testnet.bscscan.com/',
    explorer: 'https://testnet.bscscan.com/',
    infoLink: 'https://testnet.bscscan.com/',
    label: 'Bsc Test',
    logoUrl: polygonMaticLogo,
    nativeCurrency: { name: 'Bsc Test', symbol: 'TBNB', decimals: 18 },
  },
  [SupportedChainId.KCC_TEST]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    docs: 'https://scan-testnet.kcc.network/',
    explorer: 'https://scan-testnet.kcc.network/',
    infoLink: 'https://scan-testnet.kcc.network/',
    label: 'Bsc Test',
    logoUrl: polygonMaticLogo,
    nativeCurrency: { name: 'Bsc Test', symbol: 'TBNB', decimals: 18 },
  },
  [SupportedChainId.HUOBI_TEST]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    docs: 'https://scan-testnet.hecochain.com/',
    explorer: 'https://scan-testnet.hecochain.com/',
    infoLink: 'https://scan-testnet.hecochain.com/',
    label: 'Bsc Test',
    logoUrl: polygonMaticLogo,
    nativeCurrency: { name: 'Bsc Test', symbol: 'TBNB', decimals: 18 },
  },
}
