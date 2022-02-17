import { SupportedChainId } from './chains'

export type AddressMap = { [chainId: number]: string }

export const USDC: AddressMap = {
  [SupportedChainId.EVMOS_TEST]: '0x243a5edcC577b0a3356DB397393879021aF77a26',
}
