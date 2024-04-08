import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { addIngredient } from "../../../services/slices/constructorSlice";
import PropTypes from "prop-types";

const BurgerList = ({ isBun, className, children }) => {
  const dispatch = useDispatch();
  const [{ isHover }, bunTarget] = useDrop({
    
    accept: isBun ? "bun" : "other",
    drop(item) {
      dispatch(
        addIngredient( 
          item
        )
      );
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    <ul className={`${isHover && "hover"} ${className}`} ref={bunTarget}>
      {children}
    </ul>
  );
};

BurgerList.propTypes = {
  isBun: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
export default BurgerList;
