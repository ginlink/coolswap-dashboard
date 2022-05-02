import { Web3Provider } from '@ethersproject/providers'

export async function addToken(library: Web3Provider | undefined, address: string, symbol: string, decimals: number) {
  if (library && library.provider.isMetaMask && library.provider.request) {
    await library.provider.request({
      method: 'wallet_watchAsset',
      params: {
        //@ts-ignore // need this for incorrect ethers provider type
        type: 'ERC20',
        options: {
          address,
          symbol,
          decimals,
        },
      },
    })
  }
}
