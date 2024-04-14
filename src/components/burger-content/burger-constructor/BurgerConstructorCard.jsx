import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";

const BurgerConstructorCard = ({ id, index, children, moveCard }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "card",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <li ref={ref} style={{ opacity }}>
      {children}
    </li>
  );
};
BurgerConstructorCard.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  moveCard: PropTypes.func.isRequired
};
export default BurgerConstructorCard;
