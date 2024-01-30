import { useState } from 'react'
import { Item, SideMenuProps } from '../../router/view/interfaces'
import { useNavigate } from 'react-router-dom'
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
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

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
    name: 'User Manage',
    open: false,
    children : [
      { 
        id: 1,
        name: 'User List',
        url: 'user-manage/list',
        icon: <PeopleAltIcon />
      }
    ]
  },
  {
    id: 3,
    icon: <ManageAccountsIcon />,
    name: 'User Rights Manage',
    open: false,
    children : [
      {
        id: 1,
        name: 'Role List',
        url: 'right-manage/role/list',
        icon: <PersonAddIcon />
      },
      {
        id: 2,
        name: 'Right List',
        url: 'right-manage/right/list',
        icon: <SettingsSuggestIcon />
      }
    ]
  }
]



const SideMenu: React.FC<SideMenuProps> = ({ isMenuOpen, onMenuToggle, isMobile }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(1);
  const [data, setData] = useState<Item[]>(items);
  const navigate = useNavigate();

  const handleChangeOpen = (dataId : number) => {
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
                    setSelectedItem(e.id);
                    handleChangeOpen(e.id);
                    e.url && navigate(e.url);
                  }}
                >
                  <ListItemIcon>
                    {e.icon}
                  </ListItemIcon>

                  <ListItemText primary={e.name} />
                  {e.children && (e.open ? <ExpandMore /> : <ChevronRight />) }
                </ListItemButton>

                {e.children && e.children.length > 0 && e.children.map(child => (
                  <Collapse 
                    key={child.id}
                    in={e.open} 
                    timeout={{ enter: 500, exit: 300}} 
                    unmountOnExit 
                    sx={{ height : 'auto' }}
                  >
                    <List 
                      component="div"
                      disablePadding
                      sx={{
                        marginTop: '8px',
                        transition: 'margin-top 2s'
                      }}
                      onClick={() => {
                        setSelectedItem(e.id);
                        child.url && navigate(child.url)
                      }}
                    >
                      <ListItemButton 
                        sx={{ 
                          pl: 4,
                          '&:hover' : {backgroundColor : '#c2cee7'},
                          borderRadius: '8px'
                        }} // 設置觸碰時背景為 透明
                        // disableRipple // 禁用波紋效果 
                      >
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