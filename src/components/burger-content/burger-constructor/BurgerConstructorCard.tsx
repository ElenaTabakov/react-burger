import React, { useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import Style from "./BurgerConstructor.module.css";
import { IIngredientItemWithId } from "../../../utils/types/types";

interface IBurgerConstroctorCard {
  index: number;
  children: React.ReactNode;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}
interface IIndex extends IIngredientItemWithId {
  index: number;
}
const BurgerConstructorCard = ({
  index,
  children,
  moveCard,
}: IBurgerConstroctorCard) => {
  const ref = useRef<HTMLLIElement>(null);
  const [, drop] = useDrop({
    accept: "card",
    hover: (item: IIndex, monitor: DropTargetMonitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      if (hoverBoundingRect && clientOffset) {
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
      }
      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return {
        index,
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <li ref={ref} style={{ opacity }} className={Style.li}>
      {children}
    </li>
  );
};

export default BurgerConstructorCard;
