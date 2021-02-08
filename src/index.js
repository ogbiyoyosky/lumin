import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import combineReducers from "./redux/root-reducer";
import "./index.css";
import App from "./App";
import ApolloWrapper from "./apolloWrapper";

const store = createStore(combineReducers);

ReactDOM.render(
  <ApolloWrapper>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloWrapper>,
  document.getElementById("root")
);
