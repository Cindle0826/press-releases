import React, { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ChevronRight from '@mui/icons-material/ChevronRight';
import ExpandMore from '@mui/icons-material/ExpandMore'
import LoadIcon from '../../router/util/LoadIcon'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSideMenu, selectAllSideMenu, setSideMenu, setFirstOpenMenu } from '../../redux/slice/SideMenuSlice'
import { AppDispatch } from '../../redux/store'

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

const SideMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sideMenus = useSelector(selectAllSideMenu);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const location = useMemo(() => {
    console.log('change ...');

    return pathname.split('/').slice(2).join('/');
  }, [pathname]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSideMenu());
      dispatch(setFirstOpenMenu({ url: location }));
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Box
      sx={{
        overflow: 'auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: 'none',
      }}
    >
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
          sideMenus.map(menu => (
            <div key={menu.id}>
              <ListItemButton
                sx={{
                  borderRadius: '8px',
                  '&:hover': {
                    // color: 'rgb(94, 53, 177)',
                    backgroundColor: 'rgb(237, 231, 246)',
                  },
                  color: menu?.url === location ? 'rgb(94, 53, 177)' : 'inherit',
                  backgroundColor: menu?.url === location ? 'rgba(94, 53, 177, 0.3)' : 'inherit',
                  fontSize: '10px'
                }}
                // autoFocus={ menu?.url === location }
                onClick={() => {
                  dispatch(setSideMenu({ id: menu.id }));
                  menu.url && navigate(menu.url);
                }}
              >
                <ListItemIcon>
                  {<LoadIcon menuName={menu.name} />}
                </ListItemIcon>

                <ListItemText primary={menu.name} />
                {menu.childrens && menu.childrens.length > 0 && (menu.open ? <ExpandMore /> : <ChevronRight />)}
              </ListItemButton>

              {menu.childrens && menu.childrens.length > 0 && menu.childrens.map(child => (
                <Collapse
                  key={child.id}
                  in={menu.open}
                  timeout={{ enter: 500, exit: 300 }}
                  unmountOnExit
                  sx={{ height: 'auto' }}
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
                        // '&:hover' : {backgroundColor : '#c2cee7'},
                        // borderRadius: '8px',
                        // color: child?.url === location ? 'rgb(94, 53, 177)' : 'inherit',
                        // backgroundColor: child?.url === location ? '#c2cee7' : 'inherit',
                        '&:hover': { backgroundColor: 'rgb(237, 231, 246)' },
                        borderRadius: '8px',
                        color: child?.url === location ? 'rgb(94, 53, 177)' : 'inherit',
                        backgroundColor: child?.url === location ? 'rgba(94, 53, 177, 0.3)' : 'inherit',
                      }} // 設置觸碰時背景為 透明
                    // disableRipple // 禁用波紋效果 
                    >
                      <ListItemIcon>
                        {<LoadIcon menuName={child.name} />}
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
    </Box>
  )
}

export default SideMenu