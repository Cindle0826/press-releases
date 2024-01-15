import React from 'react'
import SideMenu from '../../../components/sandbox/SideMenu'
import TopHeader from '../../../components/sandbox/TopHeader'
import { Outlet } from 'react-router-dom'

const NewsSandBox = () => {
  return (
    <div>
      <SideMenu/>
      <TopHeader/>
      <Outlet/>
    </div>
  )
}

export default NewsSandBox