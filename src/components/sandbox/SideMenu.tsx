import { useState } from 'react'
import { Item, SideMenuProps } from '../../router/view/interfaces'
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
import Paper from '@mui/material/Paper/Paper'
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

const items: Item[] = [
  {
    id: 1,
    icon: <HomeIcon /> ,
    url : 'home',
    name : 'Home',
    open: false
  },
  {
    id: 2,
    icon: <GroupsIcon />,
    url: 'user-manage',
    name: 'User Management',
    open: false,
    children : [
      { id: 1, name: 'User List', url: 'user-manage/list', icon: <PeopleOutlineIcon />}
    ]
  }
]



const SideMenu: React.FC<SideMenuProps> = ({ isMenuOpen, onMenuToggle, isMobile, handleNavigate }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(1);
  const [data, setData] = useState<Item[]>(items);

  const handleChangeData = (dataId : number, url: string) => {
    setData(data.map(e => e.id === dataId ? {...e, open : !e.open} : {...e}));
    // navigate(`/newsSandBox/${url}`, { replace: true })
    handleNavigate(`/newsSandBox/${url}`)
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
          width: isMobile ? '70%' : 'auto',
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
                    handleChangeData(e.id, e.url);
                  }}
                >
                  <ListItemIcon>
                    {e.icon}
                  </ListItemIcon>

                  <ListItemText primary={e.name} />
                  {e.children && (e.open ? <ExpandMore /> : <ChevronRight />) }
                </ListItemButton>

                {e.children && e.children.length > 0 && e.children.map(child => (
                  <Collapse key={child.id} in={e.open} timeout="auto" unmountOnExit sx={{ height : 'auto'}}>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          {child.icon}
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