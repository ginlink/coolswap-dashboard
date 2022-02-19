import { createReceiveTokenApi, deleteReceiveTokenApi, receiveTokenApi, tokenListApi } from '@/services/api'
import { Alert, AlertColor, Button, Card, Container, Snackbar, Stack, Typography } from '@mui/material'
import ReceiveTokenTable, { FaucetDataItem } from './ReceiveTokenTable'
import React, { useCallback, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import plusFill from '@iconify/icons-eva/plus-fill'
import { Link as RouterLink } from 'react-router-dom'
import Page from '@/components/Page'
import CreateDialog from '@/components/Dialog/CreateDialog'
import { ActionState } from './ReceiveTokenMoreMenu'
import DeleteDialog from '@/components/Dialog/DeleteDialog'
import { CHAIN_MATCH_ERROR_STR, CONNECT_ERROR_STR, UNKNOWN_ERROR_STR } from '@/constants/misc'
import Scrollbar from '@/components/Scrollbar'
import ReceiveSuccessDialog from './ReceiveSuccessDialog'
import ReceiveDialog from './ReceiveDialog'
import SendDialog from './SendDialog'
import { Contract, ethers } from 'ethers'
import ERC20_ABI from '@/abis/erc20.json'
import { useActiveWeb3React } from '@/hooks/web3'
import { Erc20 } from '@/abis/types'

export const DEFAULT_RECEIVE_AMOUNT = 1000

export default function ReceiveToken() {
  const [receiveTokenList, setReceiveTokenList] = useState<FaucetDataItem[]>()
  const [receiveOpen, setReceiveOpen] = useState(false)
  const [receiveSuccessOpen, setReceiveSuccessOpen] = useState(false)
  const [createTokenOpen, setCreateTokenOpen] = useState(false)
  const [hash, setHash] = useState<string | undefined>()
  const [currentRow, setCurrentRow] = useState<FaucetDataItem>()
  const [messageBoxOpen, setMessageBoxOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<AlertColor>('success')
  const [autoHideDuration, setAutoHideDuration] = useState(3000)
  const [deleteTokenOpen, setDeleteTokenOpen] = useState(false)
  const [sendTokenOpen, setSendTokenOpen] = useState(false)

  const { account, library, chainId } = useActiveWeb3React()

  const alertSuccessMessage = useCallback((message: string, duration = 3000) => {
    setSeverity('success')
    setMessage(message)
    setMessageBoxOpen(true)
    setAutoHideDuration(duration)
  }, [])
  const alertErrorMessage = useCallback((message: string, duration = 3000) => {
    setSeverity('error')
    setMessage(message)
    setMessageBoxOpen(true)
    setAutoHideDuration(duration)
  }, [])

  const updateTokenList = useCallback(() => {
    tokenListApi()
      .then((res) => {
        setReceiveTokenList(res)
      })
      .catch((err) => {
        console.log('[err]:', err)
      })
  }, [])

  const handleReceiveAction = useCallback(
    async (e, state: ActionState, row: FaucetDataItem) => {
      try {
        setCurrentRow(row)

        if (state === ActionState.RECEIVE) {
          setReceiveOpen(true)
        } else if (state === ActionState.DELETE) {
          setDeleteTokenOpen(true)
        } else if (state === ActionState.SEND) {
          setSendTokenOpen(true)
        }
      } catch (err: any) {
        alertErrorMessage(err.message || UNKNOWN_ERROR_STR)
      }
    },
    [alertErrorMessage]
  )

  const handleSubmitReceive = useCallback(
    async (values: { address: string; amount: string }) => {
      try {
        if (!currentRow) return

        const { address: receive, amount } = values
        const { address: token_address } = currentRow

        const res = await receiveTokenApi(receive, token_address, amount)

        // alertSuccessMessage('Receive success')

        setHash(res.hash)
        setReceiveOpen(false)
        setReceiveSuccessOpen(true)
      } catch (err: any) {
        console.log('[err]:', err)
        alertErrorMessage(err.message || UNKNOWN_ERROR_STR)
      }
    },
    [alertErrorMessage, currentRow]
  )

  const handleSubmitSend = useCallback(
    async (values: { amount: string }) => {
      try {
        debugger
        if (!currentRow) {
          return alertErrorMessage(UNKNOWN_ERROR_STR)
        }

        if (!account || !library) {
          return alertErrorMessage(CONNECT_ERROR_STR)
        }

        const { amount } = values
        const { address, admin, chain_id } = currentRow

        if (!chain_id || chain_id != chainId) {
          return alertErrorMessage(CHAIN_MATCH_ERROR_STR)
        }

        const signer = library.getSigner()

        // send token
        const tokenContract = new Contract(address, ERC20_ABI.abi, signer) as Erc20

        const _amount = ethers.utils.parseUnits(amount, 18)
        const { wait } = await tokenContract.transfer(admin, _amount)

        await wait()

        setSendTokenOpen(false)
        alertSuccessMessage('Send success')
      } catch (err: any) {
        console.log('[err]:', err)
        alertErrorMessage(err.message || UNKNOWN_ERROR_STR)
      }
    },
    [account, alertErrorMessage, alertSuccessMessage, chainId, currentRow, library]
  )

  const handleSubmitCreate = useCallback(
    async (values: { chain_id: string; address: string; private_key: string }) => {
      try {
        const { chain_id, address, private_key } = values

        await createReceiveTokenApi(chain_id, address, private_key)

        updateTokenList()
        setCreateTokenOpen(false)
        alertSuccessMessage('Create success')
      } catch (err: any) {
        console.log('[err]:', err)
        alertErrorMessage(err.message || UNKNOWN_ERROR_STR)
      }
    },
    [alertErrorMessage, alertSuccessMessage, updateTokenList]
  )

  const handleSubmitDelete = useCallback(
    async (values: { private_key: string }) => {
      try {
        if (!currentRow) {
          return alertErrorMessage('Invalid delete id')
        }

        const { private_key } = values
        const { id } = currentRow

        await deleteReceiveTokenApi(id, private_key)
        alertSuccessMessage('Delete success')
        updateTokenList()
        setDeleteTokenOpen(false)
      } catch (err: any) {
        console.log('[err]:', err)
        alertErrorMessage(err.message || UNKNOWN_ERROR_STR)
      }
    },
    [alertErrorMessage, alertSuccessMessage, currentRow, updateTokenList]
  )

  useEffect(() => {
    updateTokenList()
  }, [updateTokenList])

  return (
    <Page title="Receive Token | Coolswap">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Faucet
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => setCreateTokenOpen(true)}
          >
            <Typography variant="body1">Create</Typography>
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <ReceiveTokenTable dataList={receiveTokenList} onAction={handleReceiveAction} />
          </Scrollbar>
        </Card>
      </Container>

      <ReceiveDialog
        open={receiveOpen}
        onClose={() => setReceiveOpen((prev) => !prev)}
        onSubmit={handleSubmitReceive}
        row={currentRow}
      />

      <ReceiveSuccessDialog
        open={receiveSuccessOpen}
        title={'Receive Success'}
        hash={hash}
        onClose={() => setReceiveSuccessOpen((prev) => !prev)}
      />

      <SendDialog
        open={sendTokenOpen}
        onClose={() => setSendTokenOpen((prev) => !prev)}
        onSubmit={handleSubmitSend}
        row={currentRow}
      />

      <CreateDialog open={createTokenOpen} onClose={() => setCreateTokenOpen(false)} onSubmit={handleSubmitCreate} />

      <DeleteDialog
        open={deleteTokenOpen}
        onClose={() => setDeleteTokenOpen(false)}
        onSubmit={handleSubmitDelete}
        row={currentRow}
      />

      <Snackbar
        open={messageBoxOpen}
        autoHideDuration={autoHideDuration}
        onClose={() => setMessageBoxOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setMessageBoxOpen(false)} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Page>
  )
}
