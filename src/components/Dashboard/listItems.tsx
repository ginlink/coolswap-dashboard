import React, { useEffect, useState } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PeopleIcon from '@mui/icons-material/People'
import BarChartIcon from '@mui/icons-material/BarChart'
import LayersIcon from '@mui/icons-material/Layers'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { Collapse, List, ListItemButton } from '@mui/material'
import {
  StarBorder,
  Send as SendIcon,
  Drafts as DraftsIcon,
  Inbox as InboxIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import { t } from '@lingui/macro'

const Wrapper = styled.div`
  a,
  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: inherit;
  }
`

const MyListItemButton = styled(ListItemButton)`
  margin: 0 15px;
`
const ActiveMyListItemButton = styled(MyListItemButton)`
  background-color: #3874cb;
  border-radius: 10px;
  color: #ffffff;
  :hover {
    background-color: #3874cb;
  }
`

// export const NavLink = styled(NavLink)`
//   text-decoration: none;
//   color: inherit;
// `

export function NavList() {
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Wrapper>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Common
          </ListSubheader>
        }
      >
        <NavLink to="/home">
          {({ isActive }) =>
            isActive ? (
              <ActiveMyListItemButton>
                <ListItemIcon>
                  <InboxIcon sx={{ color: '#ffffff' }} />
                </ListItemIcon>

                <ListItemText primary={`Dashboard`} />
              </ActiveMyListItemButton>
            ) : (
              <MyListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>

                <ListItemText primary={`Dashboard`} />
              </MyListItemButton>
            )
          }
        </NavLink>

        <NavLink to="/call">
          {({ isActive }) =>
            isActive ? (
              <ActiveMyListItemButton>
                <ListItemIcon>
                  <SendIcon sx={{ color: '#ffffff' }} />
                </ListItemIcon>

                <ListItemText primary={t`Contract Call`} />
              </ActiveMyListItemButton>
            ) : (
              <MyListItemButton>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>

                <ListItemText primary={t`Contract Call`} />
              </MyListItemButton>
            )
          }
        </NavLink>

        <MyListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={t`Tokens`} />

          {open ? <ExpandLess /> : <ExpandMore />}
        </MyListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit sx={{ pl: 4 }}>
          <List component="div" disablePadding>
            <NavLink to="/token/create">
              {({ isActive }) =>
                isActive ? (
                  <ActiveMyListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={t`Create Token`} />
                  </ActiveMyListItemButton>
                ) : (
                  <MyListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={t`Create Token`} />
                  </MyListItemButton>
                )
              }
            </NavLink>

            <NavLink to="/token/receive">
              {({ isActive }) =>
                isActive ? (
                  <ActiveMyListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={t`Receive Token`} />
                  </ActiveMyListItemButton>
                ) : (
                  <MyListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={t`Receive Token`} />
                  </MyListItemButton>
                )
              }
            </NavLink>
          </List>
        </Collapse>
      </List>
    </Wrapper>
  )
}

export const mainListItems = (
  <div>
    <Collapse in={true} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <MyListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </MyListItemButton>
      </List>
    </Collapse>

    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem>
  </div>
)
