import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item";
import { useQuery } from "@apollo/client";
import { CURRENCY } from "../../graphql/queries";
import { changeCurrency, setCartState } from "../../redux/cart/cart.action";
import "./cart-dropdown.styles.scss";

const CartDropdown = ({
  hidden,
  carts,
  changeCurrency,
  setCartState,
  currency,
}) => {
  const [currencies, setCurrency] = useState([]);
  const { data, loading } = useQuery(CURRENCY);
  const [currencySelected, setCurrencySelected] = useState(currency);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (data && data.currency) {
      setCurrency(data.currency);
    }
  });

  const selectCurrency = async ({ target }) => {
    setCurrencySelected(target.value);
    changeCurrency(target.value);
  };

  const closePanel = () => {
    document.body.style.overflow = "auto";
    setCartState(true);
  };
  return (
    <div className="cart-dropdown">
      <div className="close-dropdown" onClick={closePanel}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 492.004 492.004"
          style={{ height: "15px", width: "10px", fill: "rgb(43, 46, 43)" }}
        >
          <path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"></path>
        </svg>
      </div>
      <div className="currency-select-row">
        {currency ? (
          <select
            className="currency-select "
            style={{ maxWidth: "80px" }}
            value={currencySelected}
            onChange={selectCurrency}
          >
            {currencies.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        ) : null}
      </div>
      <div className="cart-items">
        {carts.length ? (
          carts.map((item, index) => (
            <CartItem item={item} key={index} currency={currency} />
          ))
        ) : (
          <div style={{ textAlign: "center" }}>
            There are no items in your cart.
          </div>
        )}
      </div>
      <div className="margin-auto">
        <div className="flex">
          <span>Subtotal</span> :
          <span>
            {currencySelected}
            {carts
              .reduce((acc, cart) => {
                return acc + cart.price * cart.quantity;
              }, 0)
              .toFixed(2)}
          </span>
        </div>
        <CustomButton style={{ width: "100%" }}>
          PROCEED TO CHECKOUT
        </CustomButton>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  carts: state.cart.carts,
  currency: state.cart.currency,
});

const mapDispatchToProps = (dispatch) => ({
  changeCurrency: (currency) => dispatch(changeCurrency(currency)),
  setCartState: (isHidden) => dispatch(setCartState(isHidden)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
