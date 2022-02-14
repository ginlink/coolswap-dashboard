import styled from 'styled-components/macro'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ProTip from './ProTip'
import React, { useCallback } from 'react'
import { Button } from '@mui/material'
import { useTokenContract } from '@/hooks/useContract'
import { USDC } from '@/constants/address'
import { useActiveWeb3React } from '@/hooks/web3'
import { Wallet } from 'ethers'
import { getProviderOrSigner } from '@/utils'
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { RPC_URL } from '@/connectors'
import { parseEther } from 'ethers/lib/utils'

const Wrapper = styled.div``

export default function Test() {
  const { chainId, account } = useActiveWeb3React()

  const usdcContract = useTokenContract(chainId ? USDC[chainId] : undefined)

  const onClick1 = useCallback(async () => {
    // 领取币种
    if (!usdcContract || !account) return

    const wallet2 = new Wallet(
      '125991b7c611d70cb066bf3fa20f5fa0c8e641b149ae24c82dc8174de5313af3',
      new JsonRpcProvider(chainId ? RPC_URL[chainId] : undefined)
    )

    const res = await wallet2.getBalance()
    // const transaction =
    // const res = wallet2.sendTransaction(transaction)

    // const res = await usdcContract.transfer('0xDF17602fea1B5f0D0f0C35dF444630394E54dA33', parseEther('0.001'))
    console.log('[res]:', res)
  }, [usdcContract, account, chainId])

  return (
    <Wrapper>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Button sx={{ width: '100%' }} variant="contained" onClick={() => onClick1()}>
            Receive
          </Button>
        </Box>
      </Container>
    </Wrapper>
  )
}
