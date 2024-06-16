import { useEffect, useState } from "react";
import IngredeientDetailsStyles from "./IngredeientDetails.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredientsAsync } from "../../../../services/slices/ingredientsSlice";
import {
  IStoreIngredients,
  IIngredientItem,
} from "../../../../utils/types/types";

interface IAppIngregients {
  ingredients: IStoreIngredients;
}
const IngredeientDetails = () => {
  const { id } = useParams();
  const ingredients = useSelector(
    (state: IAppIngregients) => state.ingredients.ingredients
  );
  const [currentIng, setCurrentIng] = useState<IIngredientItem>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (ingredients.length === 0) {
      //@ts-ignore
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
    return;
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
