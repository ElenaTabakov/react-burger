import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerIngredientCard = ({name,image,price,id}) => {
  return (
    <div id={id}>
      <div><img src={image} alt={name}/></div>
       <span>{price} <CurrencyIcon /> </span>
       <h3>{name}</h3>
    </div>
  )
}

export default BurgerIngredientCard
