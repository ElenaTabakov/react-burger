import React from 'react'
import NavItemStyles from './NavItem.module.css'

const NavItem = ({link, text ,icon, id, onClick, activeLink}) => {
  return (
      <a href={link} className={`${NavItemStyles.link} ${activeLink === id && NavItemStyles.active_link }  d-flex`} id={id} onClick={onClick}>{icon}{text}</a>
  )
}

export default NavItem
