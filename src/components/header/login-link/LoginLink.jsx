import LoginStyle from './Login.module.css'
import NavItem from '../nav/nav-item/NavItem'
import { ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'

const LoginLink = () => {
  return (
    <div className={`${LoginStyle.login_wrapper}`}>
      <NavLink to="/login" className={({isActive}) => isActive ? LoginStyle.active : LoginStyle.link}>
           <NavItem icon={<ProfileIcon  />} text={'Личный кабинет'}/>
       </NavLink>
    </div>
  )
}

export default LoginLink
