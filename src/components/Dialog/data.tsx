import { NETWORK_LABELS, SupportedChainId } from '@/constants/chains'

export const chainIds: readonly { label: string; value: SupportedChainId }[] = [
  {
    label: `${SupportedChainId.RINKEBY.toString()}-${NETWORK_LABELS[SupportedChainId.RINKEBY] ?? ''}`,
    value: SupportedChainId.RINKEBY,
  },
  {
    label: `${SupportedChainId.BSC_TEST.toString()}-${NETWORK_LABELS[SupportedChainId.BSC_TEST] ?? ''}`,
    value: SupportedChainId.BSC_TEST,
  },
  {
    label: `${SupportedChainId.KCC_TEST.toString()}-${NETWORK_LABELS[SupportedChainId.KCC_TEST] ?? ''}`,
    value: SupportedChainId.KCC_TEST,
  },
  {
    label: `${SupportedChainId.HUOBI_TEST.toString()}-${NETWORK_LABELS[SupportedChainId.HUOBI_TEST] ?? ''}`,
    value: SupportedChainId.HUOBI_TEST,
  },
]
