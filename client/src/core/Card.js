import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, removeItem, updateItem } from "./cartHelpers";

const Card = ({
  product,
  removeButton = false,
  cartUpdate = false,
  cartButton = true,
  showButton = true,
  de = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
 //
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartButton = (qu) => {
    if (qu > 0) {
      return (
        cartButton && (
          <div id="btt" onClick={addToCart} className="btn btn-orange">
            Add to cart
          </div>
        )
      );
    } else {
      return (
        cartButton && <div className="ui negative button">Out of Stock</div>
      );
    }
  };

  const handleChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };
  const showCartUpdate = () => {
    return (
      cartUpdate && (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
            <input
              type="number"
              value={count}
              onChange={handleChange(product._id)}
              className="form-control ml-3"
              style={{ width: "60px" }}
            />
          </div>
        </div>
      )
    );
  };

  const showCartRemove = () => {
    return (
      removeButton && (
        <button
          onClick={() => removeItem(product._id)}
          className="btn btn-red"
        >
          {" "}
          Remove
        </button>
      )
    );
  };
  //console.log(product);
  return (
    <div className="card ">
      <div className="card-header bg-primary text-white">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <div className="card-img-top">
          <ShowImage item={product} url="product" />
        </div>
        <p className="lead text-dark" style={{fontWeight:"bolder"}}>&#8377;{product.price}</p>
        <div className="ui buttons">
          {showAddToCartButton(product.quantity)}
        </div>
        {/* <hr /> */}
        {showCartUpdate()}
        {showCartRemove()}
      </div>
    </div>
  );
};

export default Card;
