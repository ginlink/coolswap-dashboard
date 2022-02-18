import ReceiveForm from '@/components/ReceiveForm'
import { createReceiveTokenApi, deleteReceiveTokenApi, receiveTokenApi, tokenListApi } from '@/services/api'
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Snackbar,
  Stack,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from '@mui/material'
import styled from 'styled-components/macro'
import ReceiveTokenTable, { ReceiveTokenDataItem } from './ReceiveTokenTable'
import React, { useCallback, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import copyOutline from '@iconify/icons-eva/copy-outline'
import checkmarkCircleOutline from '@iconify/icons-eva/checkmark-circle-outline'
import plusFill from '@iconify/icons-eva/plus-fill'
import copy from 'copy-to-clipboard'
import { shortenAddress } from '@/utils'
import { Link as RouterLink } from 'react-router-dom'
import Page from '@/components/Page'
import CreateDialog from '@/components/Dialog/CreateDialog'
import { ActionState } from './ReceiveTokenMoreMenu'
import DeleteDialog from '@/components/Dialog/DeleteDialog'
import { UNKNOWN_ERROR_STR } from '@/constants/misc'
import Scrollbar from '@/components/Scrollbar'

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[3],
    fontSize: 11,
  },
}))

const DEFAULT_RECEIVE_AMOUNT = 1000

export default function ReceiveToken() {
  const [receiveTokenList, setReceiveTokenList] = useState<ReceiveTokenDataItem[]>()
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [copySuccessOpen, setCopySuccessOpen] = useState(false)
  const [createTokenOpen, setCreateTokenOpen] = useState(false)
  const [tokenAddress, setTokenAddress] = useState<string | undefined>()
  const [hash, setHash] = useState<string | undefined>()
  const [symbol, setSymbol] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [messageBoxOpen, setMessageBoxOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<AlertColor>('success')
  const [autoHideDuration, setAutoHideDuration] = useState(3000)
  const [deleteTokenOpen, setDeleteTokenOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number>()

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
    async (e, state: ActionState, row: ReceiveTokenDataItem) => {
      const { address, symbol, id } = row

      try {
        if (state === ActionState.RECEIVE) {
          setAddress(address)
          setSymbol(symbol)

          setTokenAddress(address)
          setOpen(true)
        } else if (state === ActionState.EDIT) {
        } else if (state === ActionState.DELETE) {
          setDeleteId(id)
          setDeleteTokenOpen(true)
        }
      } catch (err: any) {
        alertErrorMessage(err.message || UNKNOWN_ERROR_STR)
      }
    },
    [alertErrorMessage]
  )

  const handleSubmit = useCallback(
    async (values) => {
      try {
        if (!tokenAddress) return

        const { address: receive } = values
        const token_address = tokenAddress
        const amount = String(DEFAULT_RECEIVE_AMOUNT)

        const res = await receiveTokenApi(receive, token_address, amount)

        // alertSuccessMessage('Receive success')

        setHash(res.hash)
        setOpen(false)
        setDialogOpen(true)
      } catch (err: any) {
        console.log('[err]:', err)
        alertErrorMessage(err.message || UNKNOWN_ERROR_STR)
      }
    },
    [alertErrorMessage, tokenAddress]
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
        if (!deleteId) {
          return alertErrorMessage('Invalid delete id')
        }

        const { private_key } = values
        const id = deleteId

        await deleteReceiveTokenApi(id, private_key)
        alertSuccessMessage('Delete success')
        updateTokenList()
        setDeleteTokenOpen(false)
      } catch (err: any) {
        console.log('[err]:', err)
        alertErrorMessage(err.message || UNKNOWN_ERROR_STR)
      }
    },
    [alertErrorMessage, alertSuccessMessage, deleteId, updateTokenList]
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

        <Dialog onClose={() => setOpen((prev) => !prev)} open={open}>
          <DialogTitle>Receive</DialogTitle>

          <DialogContent>
            <Box>
              <Typography component="div" variant="body1">
                Receive Token: <strong>{symbol}</strong> ({address && shortenAddress(address)})
              </Typography>
              <Typography component="div" variant="body1">
                Receive Amount: {DEFAULT_RECEIVE_AMOUNT}
              </Typography>
              <ReceiveForm onSubmit={handleSubmit} />
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog maxWidth="sm" onClose={() => setDialogOpen((prev) => !prev)} open={dialogOpen}>
          <DialogTitle>Receive Success</DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Stack
                direction="row"
                alignItems="center"
                spacing={{ xs: 0.5, sm: 1.5 }}
                onClick={() => {
                  setCopySuccessOpen(true)
                  copy(hash ?? '')
                  setTimeout(() => {
                    setCopySuccessOpen(false)
                  }, 1000)
                }}
              >
                <Icon
                  style={{ cursor: 'pointer' }}
                  icon={checkmarkCircleOutline}
                  color={'#00AB55'}
                  width={32}
                  height={32}
                />
                <Box>
                  <Typography component="div" variant="body1">
                    hash:
                  </Typography>

                  <Input sx={{ width: '450px' }} defaultValue={hash} />
                </Box>
                <LightTooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  open={copySuccessOpen}
                  title="Copy Success"
                  placement="top"
                >
                  <Icon style={{ cursor: 'pointer' }} icon={copyOutline} width={20} height={20} />
                </LightTooltip>
              </Stack>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen((prev) => !prev)} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Container>

      <CreateDialog open={createTokenOpen} onClose={() => setCreateTokenOpen(false)} onSubmit={handleSubmitCreate} />

      <DeleteDialog open={deleteTokenOpen} onClose={() => setDeleteTokenOpen(false)} onSubmit={handleSubmitDelete} />

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
