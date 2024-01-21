import { useState } from 'react';
import { TopHeaderProps } from '../../router/view/interfaces'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';

const items = [
  { id: 1, name: "login", active: false },
  { id: 2, name: "logout", active: true }
]

const TopHeader: React.FC<TopHeaderProps> = ({ onMenuToggle }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(123);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      console.log(456);
      setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    // zIndex 確保 導航欄在 左側欄之上 
    // sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    <>
      <AppBar position="fixed"
        sx={{
          height: '80px',
          backgroundColor: 'white',
          // 陰影 
          boxShadow: 'none',
          // border 底部線條
          borderBottom: '2px solid #ddd'
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuToggle}
            sx={{ marginRight: 2, }}
          >
            <MenuIcon sx={{ fontSize: '2rem', color: "gray" }} />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              color: 'gray',
            }}
          >
            <span style={{ marginRight: '8px', fontSize: '2rem' }}>Welcome admin!</span>
            <IconButton
              onClick={handlePopoverOpen}
              // onMouseLeave={handlePopoverClose}
            >
              <Avatar sx={{ backgroundColor: 'pink' }} >
                <ManageAccountsIcon />
              </Avatar>
            </IconButton>
            {/* Popover 彈跳框 */}
            <Popover
              // sx={{ pointerEvents: 'none' }}
              sx={{ width : "100%"}}
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              disableRestoreFocus
            >
              {
                items.map(e => {
                  return <MenuItem
                    key={e.id}
                    sx={{ color: e.active ? 'red' : '' }}
                    onClick={(event) => {
                      // 新增點選時的處理程序
                      console.log(`Clicked on ${e.name}`);
                      handlePopoverClose(event);
                    }}
                  >
                    {e.name}
                  </MenuItem>
                })
              }
            </Popover>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default TopHeader