import { useEffect, useState } from "react";
import IngredeientDetailsStyles from "./IngredeientDetails.module.css";
import { useParams } from "react-router-dom";
import { RootState, useDispatch, useSelector } from "../../../../services/store";
import { fetchIngredientsAsync } from "../../../../services/slices/ingredientsSlice";
import {
  IIngredientItem,
} from "../../../../utils/types/types";


const IngredeientDetails = () => {
  const { id } = useParams();
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );
  const [currentIng, setCurrentIng] = useState<IIngredientItem | undefined>(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredientsAsync());
    }
    return;
  }, [ingredients, dispatch]);

  useEffect(() => {
    if (ingredients.length !== 0) {
      const current = ingredients.find((item) => item._id === id);
      console.log(ingredients, id);
      if (current) {
        setCurrentIng(current);
      }
    }
    return;
  }, [ingredients, id]);

  if( !currentIng ) {
    return null;
  } 
  return (
    <div className={IngredeientDetailsStyles.container}>
      <div>
        <img src={currentIng.image_large} alt={currentIng.name} />
      </div>
      <h3>{currentIng.name}</h3>
      <div className={IngredeientDetailsStyles.details}>
        <span className={IngredeientDetailsStyles.pfc}>
          <span>{"Калории,ккал"}</span>
          {currentIng.calories}
        </span>
        <span className={IngredeientDetailsStyles.pfc}>
          <span>{"Белки, г"}</span>
          {currentIng.proteins}
        </span>
        <span className={IngredeientDetailsStyles.pfc}>
          <span>{"Жиры, г"}</span>
          {currentIng.fat}
        </span>
        <span className={IngredeientDetailsStyles.pfc}>
          <span>{"Углеводы, г"}</span>
          {currentIng.carbohydrates}
        </span>
      </div>
    </div>
  );
};


export default IngredeientDetails;
