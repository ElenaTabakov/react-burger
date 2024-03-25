import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientCardStyle from './BurgerIngredientCard.module.css'

const BurgerIngredientCard = ({ingredient}) => {
  const {name,image,price,id} = ingredient;
  const handleIngredientDetails = () => {
   
  }
  return (
    <div id={id} className={BurgerIngredientCardStyle.item} onClick={handleIngredientDetails}>
      <div><img src={image} alt={name}/></div>
       <span className={BurgerIngredientCardStyle.price}>{price} <CurrencyIcon /> </span>
       <h3 className={BurgerIngredientCardStyle.title}>{name}</h3>
    </div>
  )
}

export default BurgerIngredientCard
