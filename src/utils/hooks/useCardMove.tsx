import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState, StoreReduserProps } from '../../services/store';



const useCardMove = () => {
  const [sortableIngredients, setSortableIngredients] = useState<[] | string[]>([]);
  const { ingredients } = useSelector((state:StoreReduserProps) => state.constructorBurger);

  useEffect(() => {
    setSortableIngredients(ingredients);
  }, [ingredients]);

  const moveCard = ({dragIndex, hoverIndex} : {dragIndex:number,hoverIndex:number}) => {
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
