import { IIngredientItem, IOrder } from "../../utils/types/types";
import {  RootState,useDispatch, useSelector } from "../../services/store";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "./OrderCard.module.css";
import IngredientImage from "./IngredientImage";
import { useEffect } from "react";
import { fetchIngredientsAsync } from "../../services/slices/ingredientsSlice";
import {v4 as UUID} from 'uuid';

interface IOrderCard extends IOrder {
  showStatus?: boolean;
}

const OrderCard = ({
  status,
  ingredients,
  name,
  createdAt,
  number,
  showStatus = false,
}: IOrderCard) => {
  const ingredientsMap = useSelector(
    (state: RootState) => state.ingredients.ingredientsMap
  );

  const dateOrder = (): JSX.Element => {
    const dateFromServer = createdAt;
    return <FormattedDate date={new Date(dateFromServer)} />;
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ingredientsMap || Object.keys(ingredientsMap).length === 0) {
      dispatch(fetchIngredientsAsync());
    }
  }, [dispatch, ingredientsMap]);

  const orderIngredients: IIngredientItem[] = ingredients.reduce<
    IIngredientItem[]
  >((acc, item) => {
    if (ingredientsMap[item]) {
      acc.push(ingredientsMap[item]);
    }

    return acc;
  }, []);

  return (
    <div className={Style.orderWrapper}>
      <div className={`d-flex ${Style.orderNumberDate}`}>
        <div className={`text_type_digits-default ${Style.orderNumber}`}>
          #{number}
        </div>
        <div className={`text_type_digits-default ${Style.orderDate}`}>
          {dateOrder()}
        </div>
      </div>
      <h3 className="name">{name}</h3>
      <div className={Style.status}>{showStatus && status}</div>
      <div className={Style.orderCardBootom}>
        <div className={Style.orderCardImages}>
          {orderIngredients.map((item, index) => {
            if (index < 5) {
              return (
                <IngredientImage
                  key={UUID()}
                  img={item.image}
                  name={item.name}
                  index={index === 0 ? 1 : index + 1}
                />
              );
            } else if (index === 5) {
              return (
                <IngredientImage
                  key={UUID()}
                  img={item.image}
                  name={item.name}
                  // index={}
                  lastItem
                >
                  <span>+{orderIngredients.length - 5}</span>
                </IngredientImage>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className={`text_type_digits-default ${Style.sum}`}>
          {orderIngredients.reduce((acc, item) => acc + item.price, 0)}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
