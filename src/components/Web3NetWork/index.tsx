import { Icon } from '@iconify/react'
import walletOutlined from '@iconify/icons-ant-design/wallet-outlined'
import { NETWORK_LABELS, SupportedChainId } from '@/constants/chains'
import { useActiveWeb3React } from '@/hooks/web3'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { shortenAddress } from '@/utils'
import { Stack, Box, Typography, Button, Chip, Avatar, Tooltip } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { injected } from '@/connectors'

export default function Web3NetWork() {
  const { account, chainId, activate, active, error } = useWeb3React()

  const handleConnect = useCallback(() => {
    activate(injected, undefined, true).catch((err) => {
      console.log('[err]:', err)

      if (err instanceof UnsupportedChainIdError) {
        activate(injected) // a little janky...can't use setError because the connector isn't set
      }
    })
  }, [activate])

  useEffect(() => {
    console.log('[]:', error, active, account)
  }, [account, active, error])

  return (
    <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1 }}>
      {chainId && (
        <Tooltip title={chainId}>
          <Chip label={NETWORK_LABELS[chainId] ?? chainId} />
        </Tooltip>
      )}

      {/* <Box>{chainId && <Typography>{NETWORK_LABELS[chainId]}</Typography>}</Box> */}

      {/* <Box sx={{ p: 2, pt: 1.5 }}> */}
      <Box>
        {account ? (
          <Button fullWidth variant="contained">
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Icon icon={walletOutlined} width={20} height={20} />

              <Typography variant="body1">{shortenAddress(account)}</Typography>
            </Stack>
          </Button>
        ) : error ? (
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={handleConnect}
            sx={{
              backgroundColor: error && 'error.main',
              '&:hover': {
                backgroundColor: 'red',
              },
            }}
          >
            {error instanceof UnsupportedChainIdError ? (
              <Typography variant="body1" sx={{ color: 'common.white' }}>
                Error network
              </Typography>
            ) : (
              <Typography variant="body1">Error</Typography>
            )}
          </Button>
        ) : (
          <Button fullWidth color="inherit" variant="outlined" onClick={handleConnect}>
            <Typography variant="body1">Connect to wallet</Typography>
          </Button>
        )}
      </Box>
    </Stack>
  )
}
