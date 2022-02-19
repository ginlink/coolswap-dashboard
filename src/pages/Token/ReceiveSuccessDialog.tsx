import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import copyOutline from '@iconify/icons-eva/copy-outline'
import checkmarkCircleOutline from '@iconify/icons-eva/checkmark-circle-outline'
import copy from 'copy-to-clipboard'

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

export default function ReceiveSuccessDialog({
  open,
  title,
  hash,
  onClose,
}: {
  open: boolean
  title: string
  hash: string | undefined
  onClose: () => void
}) {
  const [copySuccessOpen, setCopySuccessOpen] = useState(false)

  return (
    <Dialog maxWidth="sm" onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>

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
        <Button onClick={onClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}
