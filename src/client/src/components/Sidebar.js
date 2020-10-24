import React from 'react'
import logo from '../img/logo.png';
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavItem,
} from '@coreui/react'

// sidebar nav config
import navigation from './SidebarData'

const Sidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}>
      
      <CSidebarBrand className="d-md-down-none">
        <h3 className="c-sidebar-brand-full">Boston Code Camp</h3>
        <img src={logo} alt="Logo" className="c-sidebar-brand-minimized" height="15" />
      </CSidebarBrand>
      
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      
      <CSidebarMinimizer className="c-d-md-down-none" />
      
    </CSidebar>
  )
}

export default React.memo(Sidebar)
