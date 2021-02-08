import React from "react";
import { setCart } from "../../redux/cart/cart.action";
import { connect } from "react-redux";
import "./cart-item.styles.scss";

const CartItem = ({
  item: { id, title, price, image_url, quantity },
  currency,
  setCart,
  carts,
}) => {
  const changeProductQuantity = (type) => {
    let result = [];
    if (type !== "increment") {
      if (quantity == 1) {
        removeItem();
        return;
      }
    }
    carts.forEach((cart) => {
      if (cart.id === id) {
        result.push({
          ...cart,
          quantity: type === "increment" ? quantity + 1 : quantity - 1,
        });
      } else {
        result.push(cart);
      }
    });
    setCart(result);
  };

  const removeItem = () => {
    setCart([
      ...carts.filter((cart) => {
        return cart.id !== id;
      }),
    ]);
  };
  return (
    <div className="cart-item">
      <div className="product-description">
        <span
          className="remove-product"
          style={{ cursor: "pointer" }}
          onClick={removeItem}
        >
          x
        </span>
        <h2>{title}</h2>
        <div className="quantity">
          <div className="quantity-selector">
            <span
              className="counter-action decrement"
              onClick={() => changeProductQuantity("decrement")}
            >
              -
            </span>
            <span className="counter-number counter"> {quantity} </span>
            <span
              className="counter-action increment"
              onClick={() => changeProductQuantity("increment")}
            >
              +
            </span>
          </div>
          <div className="price">
            {price ? currency : null}
            {Number(price * quantity).toFixed(2)}
          </div>
        </div>
      </div>
      <img src={image_url} alt="item" />
    </div>
  );
};
const mapStateToProps = (state) => ({
  carts: state.cart.carts,
  currency: state.cart.currency,
});

const mapDispatchToProps = (dispatch) => ({
  setCart: (cart) => dispatch(setCart(cart)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
