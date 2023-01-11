import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import "./CartItemCard.css";

const CartItemCard = ({ item, deleteCartItems }) => {
  console.log(item);
  const [toggle, setToggle] = useState(false);
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div className="CartItemCardSection">
        <Link to={`/product/${item.id}`}>{item.name}</Link>
        {item.size === null ? <></> : <span>{`Size : ${item.size}`}</span>}
        <span>{`Price: $ ${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.id, item.size)}>Remove</p>
      </div>

      {item.customProduct !== undefined && item.customProduct !== null && (
        <>
          <div
            className="toggleCustomProduct"
            onClick={() => setToggle(!toggle)}
          >
            <EditIcon />
          </div>
          <div
            className={
              toggle === true ? "customProductBox active" : "customProductBox"
            }
          >
            <div className="yourCustomTitle">Your custom</div>
            <div className="yourCustomProductList">
              <div>Name: {item.customProduct.name}</div>
              <div>Number: {item.customProduct.number}</div>
              <div>Patch: {item.customProduct.patch}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItemCard;
