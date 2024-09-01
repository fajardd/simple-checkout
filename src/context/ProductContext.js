import { createContext, useState, useEffect } from "react";
import { getAllProduct } from "../services/product.services";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [counter, setCounter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProduct();
        setProducts(data);
      } catch (error) {
        console.error("error fetching data", error.message);
      }
    };
    fetchData();

    const storedProducts = JSON.parse(localStorage.getItem("cart")) || [];
    setCounter(storedProducts);
  }, []);

  const handleAddBarang = (product) => {
    setCounter((prevCounter) => {
      const newCounter = [...prevCounter, product];
      localStorage.setItem("cart", JSON.stringify(newCounter));
      return newCounter;
    });
  };
  return (
    <ProductContext.Provider value={{ products, counter, handleAddBarang }}>
      {children}
    </ProductContext.Provider>
  );
};
