import React, { useMemo, useState } from 'react';
import SideMenu from '../../../components/sandbox/SideMenu'
import TopHeader from '../../../components/sandbox/TopHeader'
import { Outlet } from 'react-router-dom'
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { SideMenuProps } from '../interfaces';

const NewsSandBox = () => {
  // 漢堡按鈕狀態
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-Width: 800px)');

  // 控制按鈕導航欄打開與關閉
  const handleMenuToggle = () => {
    setIsMenuOpen(isMenuOpen => !isMenuOpen);
  };

  const SideMenuNode = useMemo(() => {
    const container = sideMenuContainer(SideMenu);
    const sideMenu = container({ isMenuOpen, isMobile, onMenuToggle: handleMenuToggle });
    console.log(`切換為${isMobile ? '手機' : '電腦'}版`);

    return sideMenu
  }, [isMenuOpen, isMobile])

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <TopHeader onMenuToggle={handleMenuToggle} isMobile={isMobile} />
      {SideMenuNode}

      {/* <div style={{ marginTop: '100px', width: '240px'}}> */}
      {/* <Box sx={{ marginTop: '10%', display: 'flex', width: '100%', height: '100%' }}> */}
      <div style={{
        margin: `105px 5px 0 ${isMobile ? 0 : '280px'}`,
        borderRadius: '10px',
        backgroundColor: '#f0f0f0',
        overflow: 'auto',
        padding: '16px',
        // border: `1px solid ${theme.palette.secondary.main}`,
        width: '100%',
        height: '100%',
      }}>
        <Outlet />
      </div>

    </div >
  )
}

/**
 * 
 * @param Component sideMenu 組件
 * @param isMobile 是否為手機版
 * @param isMenuOpen 是否開啟手機版側邊欄
 * @param onMenuToggle 關閉手機版導航欄事件
 * @returns 
 */
const sideMenuContainer = (Component: React.ComponentType<any>) =>
  ({ isMobile, isMenuOpen, onMenuToggle }: SideMenuProps) => {
    return (
      isMobile ?
        <Drawer
          sx={{
            // marginTop: '100px',
            position: 'absolute',
            flexShrink: 0,
            width: '240px',
          }}
          // variant={isMobile ? 'temporary' : 'permanent'}
          variant={'temporary'}
          open={isMenuOpen}
          onClose={onMenuToggle}
          ModalProps={{ keepMounted: true }}
        >
          <Component />
        </Drawer>
        :
        <Box sx={{ position: 'fixed', marginTop: '110px', minWidth: '280px', height: '100%' }} >
          <Component />
        </Box>
    )
  }

export default NewsSandBox