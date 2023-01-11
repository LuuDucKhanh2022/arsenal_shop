import React, { useState } from "react";
import clsx from "clsx";
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import styles from "./OrderItemCard.module.css";

const OrderItemCard = ({item}) => {
  const [toggle, setToggle] = useState(false);


  return (
    <div key={item._id} >
      <img src={item.image} alt="Product" />
      <Link to={`/product/${item.product}`}>
        {item.name}
        <div>{item.size !== null ? `Size: ${item.size}` : ""}</div>
      </Link>{" "}
      <span>
        {item.quantity} X ${item.price} = <b>${item.price * item.quantity}</b>
      </span>
      {item.customProduct && (
        <>
          <div onClick={() =>setToggle(!toggle)} className={clsx(styles.toggle)}>
            <EditIcon />
          </div>
          <div className={toggle === true ? clsx(styles.customProductBox,styles.active) : clsx(styles.customProductBox) } >
            <div className={clsx(styles.title)} >Custom product</div>
            <div className={clsx(styles.yourCustom)}>
              <div className={clsx(styles.yourCustomItem)}>Name: {`${item.customProduct.name}`}</div>
              <div className={clsx(styles.yourCustomItem)}>Number: {`${item.customProduct.number}`}</div>
              <div className={clsx(styles.yourCustomItem)}>Patch: {`${item.customProduct.patch}`}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderItemCard;
