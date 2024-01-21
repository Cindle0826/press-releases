import { useState } from 'react';
import SideMenu from '../../../components/sandbox/SideMenu'
import TopHeader from '../../../components/sandbox/TopHeader'
import { Outlet } from 'react-router-dom'

const NewsSandBox = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <TopHeader onMenuToggle={handleMenuToggle} />
      <SideMenu isMenuOpen={isMenuOpen} onMenuToggle={handleMenuToggle} />
      <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
        {/* Content */}
        <Outlet />
      </div>
    </div>
  )
}

export default NewsSandBox