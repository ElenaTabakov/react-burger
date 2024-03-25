import React from 'react'
import LoginStyle from './Login.module.css'
import NavItem from '../nav/nav-item/NavItem'
import { LockIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const Login = () => {
  return (
    <div className={`${LoginStyle.login_wrapper}`}>
           <NavItem icon={<LockIcon />} text={'Личный кабинет'} id={'3'} href="#"/>
    </div>
  )
}

export default Login
