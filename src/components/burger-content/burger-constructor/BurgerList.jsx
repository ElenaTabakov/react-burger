import React from "react";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { addIngredient } from "../../../services/slices/constructorSlice";
import { increaseQty} from "../../../services/slices/ingredientsSlice";
import PropTypes from "prop-types";
import { v4 as UUID } from 'uuid';

const BurgerList = ({ isBun, className, children}) => {
  const dispatch = useDispatch();

  const [{ isHover }, bunTarget] = useDrop({
    accept: isBun ? "bun" : "other",
    drop(item) {
      dispatch(
        addIngredient({
          type: isBun ? "bun" : "other",
          ingredient: item.ingredient,
          uniqueId: UUID()
        })
      );
      dispatch(increaseQty(item))
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });


  return (
    <ul className = {`${isHover && 'hover'} ${className}`}  ref={bunTarget} >
      {children}
    </ul>
  );
};

BurgerList.propTypes = {
  isBun:PropTypes.bool,
  className:PropTypes.string,
  children: PropTypes.node.isRequired,
};
export default BurgerList;
