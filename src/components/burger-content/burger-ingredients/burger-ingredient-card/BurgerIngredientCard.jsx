import React, {useState} from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientCardStyle from './BurgerIngredientCard.module.css'
import Modal from '../../../modal/Modal'

const BurgerIngredientCard = ({ingredient}) => {
  const [showModal, setShowModal] = useState(false);
  const {name,image,price,id} = ingredient;

  return (
    <div id={id} className={BurgerIngredientCardStyle.item} onClick={() => setShowModal(true)}>
      <div><img src={image} alt={name}/></div>
       <span className={BurgerIngredientCardStyle.price}>{price} <CurrencyIcon /> </span>
       <h3 className={BurgerIngredientCardStyle.title}>{name}</h3>
       {showModal && <Modal onClose={() => setShowModal(false)} header={'test'} >Smth text </Modal>}
    </div>
  )
}

export default BurgerIngredientCard
