import React from "react";
import CustomButton from "../custom-button/custom-button.component";
// import { useState } from "react";
import { connect } from "react-redux";
import { setCart, setCartState } from "../../redux/cart/cart.action";
import "./collection-item.styles.scss";

const CollectionItem = ({ item, setCart, setCartState, hidden, currency }) => {
  const { title, price, image_url } = item;

  const addToCart = () => {
    if (hidden === true) {
      setCartState(false);
    }
    setCart(item);
  };
  // const [cartDetails,setCartDetails] = useState({})
  return (
    <div className="preview">
      <div className="collection-item">
        <img src={image_url} alt="" />
        <div className="collection-footer">
          <h2 className="name">{title}</h2>
          <p className="price">
            From : {currency} {Number(price).toFixed(2)}
          </p>
        </div>
        <CustomButton onClick={addToCart}> ADD TO CART</CustomButton>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  hidden: state.cart.hidden,
});

const mapDispatchToProps = (dispatch) => ({
  setCart: (cart) => dispatch(setCart(cart)),
  setCartState: (isHidden) => dispatch(setCartState(isHidden)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);
