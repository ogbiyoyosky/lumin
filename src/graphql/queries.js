import { gql } from "@apollo/client";

export const PRODUCTS = gql`
  query Products($Currency: Currency) {
    products {
      id
      title
      image_url
      price(currency: $Currency)
    }
  }
`;

export const CURRENCY = gql`
  query {
    currency
  }
`;
