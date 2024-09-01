import React from "react";
import { ProductProvider } from "../context/ProductContext";
import Counter from "../components/counter";

const CounterPage = () => {
  return (
    <ProductProvider>
      <Counter />
    </ProductProvider>
  );
};

export default CounterPage;
