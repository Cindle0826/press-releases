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

const TopHeader: React.FC<TopHeaderProps> = ({ onMenuToggle, isMobile }) => {
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
          minHeight: '10%',
          // minHeight: '100px',
          backgroundColor: 'white',
          // 陰影 
          boxShadow: 'none',
          // border: '1px solid black'
          // border 底部線條
          // borderBottom: '2px solid #ddd'
        }}
      >
        {/* justifyContent 控制 導航欄對齊的方式 space-between 左右均勻，對齊中間不留間距*/}
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', color: 'gray' }}>
          {/* 漢堡按鈕 */}
          {
            isMobile ?
              <IconButton onClick={onMenuToggle}>
                <MenuIcon sx={{ fontSize: '2rem' }} />
              </IconButton>
              :
              <h3 >Publishing news website</h3>
          }
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ marginRight: 2, }}
          >
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
              <MenuItem onClick={e => handlePopoverClose(e)}>login</MenuItem>
              <MenuItem onClick={e => handlePopoverClose(e)} sx={{ color: 'red' }}>logout</MenuItem>
            </Popover>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default TopHeader