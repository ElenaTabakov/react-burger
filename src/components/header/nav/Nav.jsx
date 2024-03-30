import NavStyle from './Nav.module.css'
import { useState } from 'react'
import NavItem from './nav-item/NavItem'
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const Nav = () => {
const [activeLink, setActiveLink] = useState('1');

const handleClickActiveLink = (e) => {
    const target = e.target.id
    setActiveLink(target);
}
  return (
    <nav className={NavStyle.nav}>
        <ul className={`${NavStyle.nav_list} d-flex`}>
            <li><NavItem link={'#'} icon={<BurgerIcon/>} text={'Конструктор'}  id={'1'} onClick={handleClickActiveLink} activeLink={activeLink} /></li>
            <li><NavItem link={'#'} icon={<ListIcon/>} text={'Лента заказов'}  id={'2'} onClick={handleClickActiveLink} activeLink={activeLink}/></li>
        </ul>
    </nav>
  )
}

export default Nav
