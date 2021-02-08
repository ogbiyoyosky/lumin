import React from "react";
import { connect } from "react-redux";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import "./header.styles.scss";

const Header = ({ hidden }) => {
  return (
    <>
      {!hidden ? (
        <>
          <div className="fixed"></div>
          <CartDropdown />
        </>
      ) : null}
    </>
  );
};

const mapStateToProps = ({ cart: { hidden, carts } }) => ({
  hidden,
});
export default connect(mapStateToProps)(Header);
