import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

const useCardMove = () => {
  const [sortableIngredients, setSortableIngredients] = useState([]);
  const { ingredients } = useSelector(state => state.constructorBurger);

  useEffect(() => {
    setSortableIngredients(ingredients);
  }, [ingredients]);

  const moveCard = (dragIndex, hoverIndex) => {
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
