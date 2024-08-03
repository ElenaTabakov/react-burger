import { useEffect, useState} from 'react';
import { RootState, useSelector } from '../../services/store';
import { IIngredientItemWithId } from '../types/types';


const useCardMove = () => {
  const [sortableIngredients, setSortableIngredients] = useState<IIngredientItemWithId[]>([]);
  const { ingredients } = useSelector((state : RootState) => state.constructorBurger);

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
