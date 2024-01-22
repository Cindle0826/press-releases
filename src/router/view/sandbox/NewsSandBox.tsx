import { useState } from 'react';
import SideMenu from '../../../components/sandbox/SideMenu'
import TopHeader from '../../../components/sandbox/TopHeader'
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from '@mui/material';

const NewsSandBox = () => {
  // 漢堡按鈕狀態
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-Width: 800px)');

  // 控制按鈕導航欄打開與關閉
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <TopHeader onMenuToggle={handleMenuToggle} isMobile={isMobile}/>
      <SideMenu isMenuOpen={isMenuOpen} onMenuToggle={handleMenuToggle} isMobile={isMobile}/>
      <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
        {/* Content */}
        <Outlet />
      </div>
    </div>
  )
}

export default NewsSandBox