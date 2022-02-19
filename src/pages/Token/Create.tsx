import { useActiveWeb3React } from '@/hooks/web3'
import { Container, Grid, Stack, Typography } from '@mui/material'
import { ethers } from 'ethers'
import Erc20_Bytecode from '@/bytecodes/rec20.json'
import Erc20_Abi from '@/abis/erc20.json'
import React, { useCallback, useEffect, useState } from 'react'
import DeployTokenForm from './DeployTokenForm'
import Page from '@/components/Page'
import ReceiveSuccessDialog from './ReceiveSuccessDialog'
import { UNKNOWN_ERROR_STR } from '@/constants/misc'
import { useSnackbar } from '@/hooks/useSnackbar'
import { createTokenApi, TokenListItem } from '@/services/token'

export default function CreateToken() {
  const { library, chainId, account } = useActiveWeb3React()
  const [receiveSuccessOpen, setReceiveSuccessOpen] = useState(false)
  const [hash, setHash] = useState('')

  const { alertError, alertSuccess } = useSnackbar()

  const handleSubmitCreate = useCallback(
    async (values: { name: string; symbol: string; decimals: number; total: number; checked: boolean }) => {
      debugger

      try {
        if (!library || !chainId || !account) return

        const abi = Erc20_Abi.abi
        const bytecode = Erc20_Bytecode.object
        const signer = library.getSigner()

        const factory = new ethers.ContractFactory(abi, `0x${bytecode}`, signer)

        const { name, symbol, decimals, total: _total, checked: isAddToList } = values
        const total = ethers.utils.parseUnits(String(_total), decimals)

        const contract = await factory.deploy(name, symbol, decimals, total)

        const address = contract.address

        console.log('[contract.address]:', contract.address)

        const res = await contract.deployTransaction.wait()

        if (isAddToList) {
          const data: Omit<TokenListItem, 'id' | 'created_at' | 'updated_at'> = {
            ...values,
            address,
            chain_id: chainId,
            creator: account,
            total: String(values.total),
          }

          await createTokenApi(data)
        }

        setHash(res.transactionHash)
        setReceiveSuccessOpen(true)
        alertSuccess('Create success')
      } catch (err: any) {
        alertError(err.message || UNKNOWN_ERROR_STR)
      }
    },
    [account, alertError, alertSuccess, chainId, library]
  )

  return (
    <Page title="Create Token | Coolswap">
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item sm={6} xs={12}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Create Token
              </Typography>
            </Stack>

            <DeployTokenForm onSubmit={handleSubmitCreate} />
          </Grid>
        </Grid>
      </Container>

      <ReceiveSuccessDialog
        open={receiveSuccessOpen}
        title={'Create Success'}
        hash={hash}
        onClose={() => setReceiveSuccessOpen((prev) => !prev)}
      />
    </Page>
  )
}
