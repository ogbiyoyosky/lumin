import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { connect } from "react-redux";
import CollectionItem from "../../components/collection-item/collection-item.component";
import Header from "../../components/header/header.component.jsx";
import { PRODUCTS } from "../../graphql/queries";
import { setCart } from "../../redux/cart/cart.action";

const ShopPage = ({ currency, setCart, carts }) => {
  const [products, setProducts] = useState([]);
  const { data, loading, refetch } = useQuery(PRODUCTS, {
    variables: {
      Currency: currency,
    },
  });

  useEffect(() => {
    refetch();
    if (data && data.products) {
      setProducts(data.products);
      var result = [];
      if (carts.length) {
        data.products.filter(function (product) {
          return carts.forEach(function (cart) {
            if (product.id === cart.id) {
              result.push({
                ...cart,
                price: product.price,
              });
            }
          });
        });
        setCart(result);
      }
    }
  }, [currency, data]);

  return (
    <>
      <Header />
      <div className="shop-page">
        <div className="collection-preview">
          {products.length
            ? products.map((item, index) => (
                <CollectionItem key={index} item={item} currency={currency} />
              ))
            : null}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  currency: state.cart.currency,
  carts: state.cart.carts,
});

const mapDispatchToProps = (dispatch) => ({
  setCart: (products) => dispatch(setCart(products)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
