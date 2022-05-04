import { useActiveWeb3React } from '@/hooks/web3'
import { Button, Card, Container, Stack, Typography } from '@mui/material'
import { ethers } from 'ethers'
import Erc20_Bytecode from '@/bytecodes/rec20.json'
import Erc20_Abi from '@/abis/erc20.json'
import React, { useCallback, useMemo, useState } from 'react'
import Page from '@/components/Page'
import ReceiveSuccessDialog from './ReceiveSuccessDialog'
import { CONNECT_ERROR, NO_PERMISSION_ERROR, UNKNOWN_ERROR_STR } from '@/constants/misc'
import { useSnackbar } from '@/hooks/useSnackbar'
import { createTokenApi, deleteTokenApi, tokenListApi, TokenListItem } from '@/services/token'
import { Link as RouterLink } from 'react-router-dom'
import { Icon } from '@iconify/react'
import plusFill from '@iconify/icons-eva/plus-fill'
import CreateTokenDialog from './CreateTokenDialog'
import Scrollbar from '@/components/Scrollbar'
import CreateTokenTable, { TokenDataItem } from './CreateTokenTable'
import { ActionStateToken } from './MoreMenuToken'
import { compareAddress } from '@/utils/address'
import ListToolbar from '@/components/ListToolbar'
import { applySortFilter } from '@/utils/sort'
import { useTokenList } from '@/state/http/hooks'
import { t, Trans } from '@lingui/macro'

export default function CreateToken() {
  const { library, chainId, account } = useActiveWeb3React()
  const [receiveSuccessOpen, setReceiveSuccessOpen] = useState(false)
  const [createTokenOpen, setCreateTokenOpen] = useState(false)
  const [currentRow, setCurrentRow] = useState<TokenDataItem>()
  const [hash, setHash] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const { alertError, alertSuccess } = useSnackbar()
  const [tokenList, updateTokenList] = useTokenList()

  const updateTokenList111 = useCallback(() => {
    tokenListApi()
      .then((res) => {
        updateTokenList(res)
      })
      .catch((err: any) => {
        console.log('[err]:', err)
        alertError(err.message || UNKNOWN_ERROR_STR)
      })
  }, [alertError, updateTokenList])

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

        updateTokenList111()

        setHash(res.transactionHash)
        setCreateTokenOpen(false)
        setReceiveSuccessOpen(true)
        alertSuccess(t`Create success`)
      } catch (err: any) {
        alertError(err.message || UNKNOWN_ERROR_STR)
      }
    },
    [account, alertError, alertSuccess, chainId, library, updateTokenList111]
  )

  const handleDeleteToken = useCallback(
    async (row: TokenDataItem) => {
      try {
        if (!account) {
          throw CONNECT_ERROR
        }

        const { creator, id } = row

        if (!compareAddress(account, creator)) {
          throw NO_PERMISSION_ERROR
        }

        await deleteTokenApi(id)

        updateTokenList111()
        alertSuccess('Delete success')
      } catch (err: any) {
        alertError(err.message || UNKNOWN_ERROR_STR)
      }
    },
    [account, alertError, alertSuccess, updateTokenList111]
  )

  const handleReceiveAction = useCallback(
    async (e, state: ActionStateToken, row: TokenDataItem) => {
      debugger
      try {
        setCurrentRow(row)

        if (state === ActionStateToken.DELETE) {
          // setDeleteTokenOpen(true)

          handleDeleteToken(row)
        }
      } catch (err: any) {
        alertError(err.message || UNKNOWN_ERROR_STR)
      }
    },
    [alertError, handleDeleteToken]
  )

  const handleFilterByValue = useCallback((value) => {
    setFilterValue(value)
  }, [])

  const filteredList = useMemo(() => applySortFilter(tokenList, undefined, filterValue), [filterValue, tokenList])

  return (
    <Page title="Create Token | CoolHelper">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            <Trans>Tokens</Trans>
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => setCreateTokenOpen(true)}
          >
            <Typography variant="body1">
              <Trans>Create</Trans>
            </Typography>
          </Button>
        </Stack>

        {/* <Grid container spacing={2} justifyContent="center">
          <Grid item sm={6} xs={12}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Create Token
              </Typography>
            </Stack>

            <DeployTokenForm onSubmit={handleSubmitCreate} />
          </Grid>
        </Grid> */}

        <Card>
          <ListToolbar filterValue={filterValue} onFilterValue={handleFilterByValue} />

          <Scrollbar>
            <CreateTokenTable dataList={filteredList} onAction={handleReceiveAction} />
          </Scrollbar>
        </Card>
      </Container>

      <CreateTokenDialog
        open={createTokenOpen}
        onClose={() => setCreateTokenOpen(false)}
        onSubmit={handleSubmitCreate}
      />

      <ReceiveSuccessDialog
        open={receiveSuccessOpen}
        title={t`Create Success`}
        hash={hash}
        onClose={() => setReceiveSuccessOpen((prev) => !prev)}
      />
    </Page>
  )
}
