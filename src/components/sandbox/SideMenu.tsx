import { SideMenuProps } from '../../router/view/interfaces'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ChevronRight from '@mui/icons-material/ChevronRight';
import ExpandMore from '@mui/icons-material/ExpandMore'
import { StarBorder } from '@mui/icons-material';
import { useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

const SideMenu: React.FC<SideMenuProps> = ({isMenuOpen, onMenuToggle}) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-Width: 800px)');

  return (
    <Drawer
      // temporary 漢堡按鈕 
      variant={isMobile ? 'temporary' : 'permanent'}
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]:
        {
          width: isMobile ? '70%' : 240,
          boxSizing: 'border-box',
          backgroundColor: 'white',
          marginTop: '80px'
        }
      }}
      open={isMenuOpen}
      onClose={onMenuToggle}
      ModalProps={{ keepMounted: true }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" />
          }
        >
          <ListItemButton onClick={() => setOpen(!open)}>
            <ListItemText primary="send mail" />
            {open ? <ExpandMore /> : <ChevronRight />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  )
}

export default SideMenu