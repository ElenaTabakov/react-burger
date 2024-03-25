import React from 'react'
import LayoutStyle from './Layout.module.css'

const Layout = ({children,className}) => {
  return (
    <div className={`${className} ${LayoutStyle.container}`}>
      {children}
    </div>
  )
}

export default Layout
