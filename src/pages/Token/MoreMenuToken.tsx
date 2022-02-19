import { Icon } from '@iconify/react'
import { useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill'
import giftOutline from '@iconify/icons-eva/gift-outline'
import React from 'react'
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material'

import editFill from '@iconify/icons-eva/edit-fill'
import sendOutlined from '@iconify/icons-ant-design/send-outlined'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'

// ----------------------------------------------------------------------

export enum ActionStateToken {
  DELETE,
}
export default function MoreMenuToken({ onAction }: { onAction?: (event: any, state: ActionStateToken) => void }) {
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
        {/* <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={(e: any) => onAction && onAction(e, ActionStateToken.EDIT)}
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
          onClick={(e: any) => onAction && onAction(e, ActionStateToken.DELETE)}
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