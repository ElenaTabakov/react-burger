import React from 'react'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const ModalHeader = ({children,onClose}) => {
  return (
    <div>
        {children}
        <button onClick={onClose}><CloseIcon/></button>
    </div>
  )
}

export default ModalHeader
