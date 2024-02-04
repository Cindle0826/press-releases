import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Item, SideMenuProps } from '../../router/view/interfaces'
import { useLocation, useNavigate } from 'react-router-dom'
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
import LoadIcon from '../../router/util/LoadIcon'

// const items = [
//   {
//     id: 1,
//     icon: <HomeIcon /> ,
//     url : 'home',
//     name : 'Home',
//     open: false
//   },
//   {
//     id: 2,
//     icon: <GroupsIcon />,
//     name: 'User Manage',
//     open: false,
//     children : [
//       { 
//         id: 1,
//         name: 'User List',
//         url: 'user-manage/list',
//         icon: <PeopleAltIcon />
//       }
//     ]
//   },
//   {
//     id: 3,
//     icon: <ManageAccountsIcon />,
//     name: 'User Rights Manage',
//     open: false,
//     children : [
//       {
//         id: 1,
//         name: 'Role List',
//         url: 'right-manage/role/list',
//         icon: <PersonAddIcon />
//       },
//       {
//         id: 2,
//         name: 'Right List',
//         url: 'right-manage/right/list',
//         icon: <SettingsSuggestIcon />
//       }
//     ]
//   }
// ]

const SideMenu: React.FC<SideMenuProps> = ({ isMenuOpen, onMenuToggle, isMobile }) => {
  const [sideMenu, setSideMenu] = useState<Item[]>();
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[2];
  console.log(useLocation().pathname);
  console.log(location);
  

  useEffect(() => {
    axios.get('http://localhost:8000/sideMenus?_embed=childrens').then((res: AxiosResponse<Item[]>) => {
      setSideMenu(res.data);
      console.log(res.data);
    })
  }, [])

  const handleChangeOpen = (menuId : number) => {
    setSideMenu(prevMenu => prevMenu?.map(e => e.id === menuId ? {...e, open : !e.open} : {...e}));
    console.log('sideMenu', sideMenu);
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
          height: "100%",
          width: isMobile ? '70%' : 'auto',
          boxSizing: 'border-box',
          backgroundColor: 'white',
          marginTop: '80px',
          border: 'none',
          padding: '2px',
          overflow : 'auto',
          flexDirection : "column"
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
              sideMenu?.map(menu => (
                <div key={menu.id}>
                <ListItemButton
                  sx={{
                    borderRadius: '8px',
                    '&:hover': {
                      color: 'rgb(94, 53, 177)',
                      backgroundColor: 'rgb(237, 231, 246)',
                    },
                    color: menu?.url === location  ? 'rgb(94, 53, 177)' : 'inherit',
                    backgroundColor: menu?.url === location ? 'rgba(94, 53, 177, 0.3)' : 'inherit',
                  }}

                  autoFocus={true}

                  onClick={() => {
                    handleChangeOpen(menu.id);
                    menu.url && navigate(menu.url);
                  }}
                >
                  <ListItemIcon>
                    { <LoadIcon menuName={menu.name} /> }
                  </ListItemIcon>

                  <ListItemText primary={menu.name} />
                  {menu.childrens && menu.childrens.length > 0 && (menu.open ? <ExpandMore /> : <ChevronRight />) }
                </ListItemButton>

                {menu.childrens && menu.childrens.length > 0 && menu.childrens.map(child => (
                  <Collapse 
                    key={child.id}
                    in={menu.open} 
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
                          { <LoadIcon menuName={child.name} /> }
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