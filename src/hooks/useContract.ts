import { Contract } from '@ethersproject/contracts'
import { useMemo } from 'react'
import { useActiveWeb3React } from './web3'
import { Web3Provider } from '@ethersproject/providers'
import { isAddress } from '@/utils'

import ERC20_ABI from '@/abis/erc20.json'
import { AddressMap } from '@/constants/address'

import { Erc20 } from '@/abis/types'

export const AddressZero = '0x0000000000000000000000000000000000000000'

export function getSigner(library: Web3Provider, account: string) {
  return library.getSigner(account).connectUnchecked()
}

export function getSignerOrProvider(library: Web3Provider, account?: string | null) {
  return account ? getSigner(library, account) : library
}

export function useContract<T extends Contract = Contract>(
  _address: AddressMap | string | undefined,
  ABI: any[],
  withSigner = true
): T | undefined {
  const { library, account, chainId } = useActiveWeb3React()

  const address = useMemo(() => {
    if (!chainId) return
    return typeof _address == 'string' ? _address : _address ? _address[chainId] : undefined
  }, [_address, chainId])

  return useMemo(() => {
    if (!library || !account || !address) return

    if (!isAddress(address) || address === AddressZero) {
      throw Error(`Invalid 'address' parameter '${address}'.`)
    }

    const contract = new Contract(address, ABI, getSignerOrProvider(library, withSigner ? account : undefined))

    return contract
  }, [ABI, account, address, library, withSigner]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI.abi, withSignerIfPossible)
}
