import React from "react";
import Style from "./OrderCard.module.css";

const IngredientImage = ({
  img,
  name,
  lastItem = false,
  children,
  index
}: {
  img: string;
  name: string;
  lastItem?: boolean;
  children?: React.ReactNode;
  index?: number;
}) => {
  return (
    <div className={`${lastItem ? Style.itemLast : ''}  ${Style.itemWrapper}`} style={index ? {zIndex : 7 - index} : {zIndex : 'unset'} }>
      <div className={Style.imageWrapper}>
        <img src={img} alt={name} />
      </div>
      {children}
    </div>
  );
};

export default IngredientImage;
