import { useState } from 'react'
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
import Paper from '@mui/material/Paper/Paper'

const items = [
  { id: 1, name: 'send mail', children : [{id : 1, name : 'Yun'}, {id : 2, name : 'Laplus'}], open : false  },
  { id: 2, name: 'hello weather', children : [{id : 1, name : 'Fr'}], open : false }
];

const SideMenu: React.FC<SideMenuProps> = ({ isMenuOpen, onMenuToggle, isMobile }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [data, setData] = useState<typeof items>(items);

  const handleChangeData = (dataId : number) => {
    setData(data.map(e => e.id === dataId ? {...e, open : !e.open} : {...e}));
  }

  return (
    <Drawer
      // temporary 隱藏 menu permanent 顯示 menu
      variant={isMobile ? 'temporary' : 'permanent'}
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]:
        {
          width: isMobile ? '70%' : 240,
          boxSizing: 'border-box',
          backgroundColor: 'white',
          marginTop: '80px',
          border: 'none',
          padding: '2px'
        }
      }}
      open={isMenuOpen}
      onClose={onMenuToggle}
      ModalProps={{ keepMounted: true }}
    >
      <Box
        sx={{
          overflow: 'auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: 'none',
        }}
      >
        <Paper sx={{ zIndex: 1 }}>
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper'

            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader" />
            }
          >
            {
              data.map(e => (
                <div key={e.id}>
                <ListItemButton
                  sx={{
                    borderRadius: '8px',
                    '&:hover': {
                      color: 'rgb(94, 53, 177)',
                      backgroundColor: 'rgb(237, 231, 246)',
                    },
                    color: selectedItem === e.id ? 'rgb(94, 53, 177)' : 'inherit',
                    backgroundColor: selectedItem === e.id ? 'rgba(94, 53, 177, 0.3)' : 'inherit',
                  }}

                  onClick={() => {
                    setSelectedItem(e.id)
                    handleChangeData(e.id);
                  }}
                >
                  <ListItemText primary={e.name} />
                  {e.open ? <ExpandMore /> : <ChevronRight />}
                </ListItemButton>

                {e.children.map(child => (
                  <Collapse key={child.id} in={e.open} timeout="auto" unmountOnExit sx={{ height : 'auto'}}>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary={child.name} />
                      </ListItemButton>
                    </List>
                  </Collapse>
                ))}
              </div>
              ))
            }

            
          </List>
        </Paper>
      </Box>
    </Drawer>
  )
}

export default SideMenu