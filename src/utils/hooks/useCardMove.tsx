import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { IBurgerConstructor ,IIngredientItemWithId } from '../types/types';

interface IAppBurgerConstructor {
  constructorBurger : IBurgerConstructor;
}
const useCardMove = () => {
  const [sortableIngredients, setSortableIngredients] = useState<IIngredientItemWithId[]>([]);
  const { ingredients } = useSelector((state : IAppBurgerConstructor) => state.constructorBurger);

  useEffect(() => {
    setSortableIngredients(ingredients);
  }, [ingredients]);

  const moveCard = (dragIndex : number , hoverIndex : number) => {
    const dragCard = sortableIngredients[dragIndex];
    const newCards = [...sortableIngredients];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);
    setSortableIngredients(newCards);
  };

  return ({
    sortableIngredients, moveCard
  })
};

export default useCardMove;
