import { Icon } from '@iconify/react'
import { Fragment, useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill'
import giftOutline from '@iconify/icons-eva/gift-outline'
import React from 'react'
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Box, Grid, Tooltip } from '@mui/material'

import sendOutlined from '@iconify/icons-ant-design/send-outlined'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import { actions } from './data'
import { ActionState } from './types'

// ----------------------------------------------------------------------

export default function ReceiveTokenMoreMenu({ onAction }: { onAction?: (event: any, state: ActionState) => void }) {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={(e: any) => onAction && onAction(e, ActionState.RECEIVE)}>
          <ListItemIcon>
            <Icon icon={giftOutline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Receive" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem sx={{ color: 'text.secondary' }} onClick={(e: any) => onAction && onAction(e, ActionState.SEND)}>
          <ListItemIcon>
            <Icon icon={sendOutlined} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Send" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        {/* <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={(e: any) => onAction && onAction(e, ActionState.EDIT)}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}

        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={(e: any) => onAction && onAction(e, ActionState.DELETE)}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  )
}

export function Actions({ onAction }: { onAction?: (event: any, action: ActionState) => void }) {
  return (
    <Grid container direction={'row'} gap={1}>
      {actions.map(({ action, icon, title, color }, i) => {
        return (
          <Fragment key={i}>
            <Box sx={{ cursor: 'pointer' }} onClick={(e: any) => onAction && onAction(e, action)}>
              <Tooltip title={title ?? ''} placement="top">
                <Icon icon={icon} color={color} />
              </Tooltip>
            </Box>
          </Fragment>
        )
      })}
    </Grid>
  )
}
