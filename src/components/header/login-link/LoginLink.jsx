import LoginStyle from './Login.module.css'
import NavItem from '../nav/nav-item/NavItem'
import { ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const LoginLink = () => {
  const [currentUser, setCurrentUser] = useState()
  const {user} = useSelector(state => state.user);

  useEffect(() => {
    if(user) {
      setCurrentUser(user.name)
    }
    return;
  },[user])
  return (
    <div className={`${LoginStyle.login_wrapper}`}>
      <NavLink to="/profile" className={({isActive}) => isActive ? LoginStyle.active : LoginStyle.link}>
           <NavItem icon={<ProfileIcon  />} text={user.name !== '' ? currentUser : 'Личный кабинет'}/>
       </NavLink>
    </div>
  )
}

export default LoginLink
