import ReceiveForm from '@/components/ReceiveForm'
import { createReceiveTokenApi, receiveTokenApi, tokenListApi } from '@/services/api'
import {
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
  Paper,
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

const Wrapper = styled.div``
const StyledPaper = styled(Paper)`
  padding: 20px;
`

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 2,
}

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

  const updateTokenList = useCallback(() => {
    tokenListApi()
      .then((res) => {
        setReceiveTokenList(res)
      })
      .catch((err) => {
        console.log('[err]:', err)
      })
  }, [])

  const handleReceiveClick = useCallback((row: ReceiveTokenDataItem) => {
    const { address, symbol } = row
    setAddress(address)
    setSymbol(symbol)

    setTokenAddress(address)
    setOpen(true)
  }, [])

  const handleSubmit = useCallback(
    async (values) => {
      try {
        if (!tokenAddress) return

        const { address: receive } = values
        const token_address = tokenAddress
        const amount = String(DEFAULT_RECEIVE_AMOUNT)

        const res = await receiveTokenApi(receive, token_address, amount)

        setHash(res.hash)
        setOpen(false)
        setDialogOpen(true)
      } catch (err) {
        console.log('[err]:', err)
      }
    },
    [tokenAddress]
  )
  const handleSubmitCreateDialog = useCallback(
    async (values: { chain_id: string; address: string; private_key: string }) => {
      try {
        const { chain_id, address, private_key } = values

        await createReceiveTokenApi(chain_id, address, private_key)

        updateTokenList()
        setCreateTokenOpen(false)
      } catch (err) {
        console.log('[err]:', err)
      }
    },
    [updateTokenList]
  )

  useEffect(() => {
    updateTokenList()
  }, [updateTokenList])

  return (
    <Page title="Receive Token | Coolswap">
      <Container>
        {/* <StyledPaper elevation={0}>
        <Stack direction="row" spacing={2}>
          Receive Header
        </Stack>
      </StyledPaper> */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Receive Token
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
          <StyledPaper elevation={0} sx={{ marginTop: '10px' }}>
            <div style={{ height: 300, width: '100%' }}>
              <ReceiveTokenTable dataList={receiveTokenList} onReceiveClick={handleReceiveClick} />
            </div>
          </StyledPaper>
        </Card>

        <Dialog onClose={() => setOpen((prev) => !prev)} open={open}>
          <DialogTitle>Receive</DialogTitle>

          <DialogContent>
            <Box>
              <Typography component="div" variant="body1">
                Receive Token: {symbol}({address && shortenAddress(address)})
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

        <CreateDialog
          open={createTokenOpen}
          onClose={() => setCreateTokenOpen(false)}
          onSubmit={handleSubmitCreateDialog}
        />
      </Container>
    </Page>
  )
}
