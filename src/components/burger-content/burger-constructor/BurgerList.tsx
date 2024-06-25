import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { addIngredient } from "../../../services/slices/constructorSlice";

interface IBurgerList {
  isBun ?: boolean;
  className : string;
  children: React.ReactNode;
}

const BurgerList = ({ isBun, className, children } : IBurgerList) => {
  const dispatch = useDispatch();
  const [{ isHover }, bunTarget] = useDrop({
    
    accept: isBun ? "bun" : "other",
    drop(item) {
      dispatch(
        //@ts-ignore
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

export default BurgerList;
