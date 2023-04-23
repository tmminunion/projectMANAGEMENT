import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import FormLayoutsIcons from 'src/views/form-layouts/UseFormTimeline'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Assistant'

export default function SwipeableTemporaryDrawer({ dodol, setnudodol, idnya }) {
  const [state, setState] = useState(dodol)

  useEffect(() => {
    console.log('datadodol ', dodol)
    setState(dodol)
  }, [dodol])

  const toggleDrawer = open => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setnudodol(open)
  }

  const babay = waw => {
    console.log('sdf sdjbchj')
  }

  const list = idnya => (
    <Box sx={{ width: 650 }} role='presentation'>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {' '}
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={'EDIT TUGAS'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <FormLayoutsIcons idnya={idnya} />
      </List>
    </Box>
  )

  return (
    <div>
      <SwipeableDrawer anchor={'right'} open={state} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        {list(idnya)}
      </SwipeableDrawer>
    </div>
  )
}
