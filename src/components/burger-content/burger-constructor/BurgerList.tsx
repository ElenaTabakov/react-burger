import { useDispatch } from "../../../services/store"
import { useDrop } from "react-dnd";
import { addIngredient } from "../../../services/slices/constructorSlice";
import { useMemo } from "react";

interface IBurgerList {
  isBun ?: boolean;
  className : string;
  children: React.ReactNode;
  isTopBun?: boolean,
  isBottomBun?: boolean;
}

const BurgerList = ({ isBun, className, children,isTopBun, isBottomBun } : IBurgerList) => {
  const dispatch = useDispatch();
  const [{ isHover }, bunTarget] = useDrop({
    
    accept: isBun ? "bun" : "other",
    drop(item) {
      dispatch(
        addIngredient( item)
      );
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const dataTestId = useMemo(() => {
    if (isTopBun) return "bun-top";
    if (isBottomBun) return "bun-bottom";
    return "other-ingredients";
  }, [isTopBun, isBottomBun]);

  return (
    <ul className={`${isHover && "hover"} ${className}`} ref={bunTarget}  data-test={dataTestId} >
      {children}
    </ul>
  );
};

export default BurgerList;
