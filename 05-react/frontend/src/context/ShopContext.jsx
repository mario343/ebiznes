import React, { createContext, useContext, useState, useEffect } from "react";

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const [basket, setBasket] = useState(() => {
    const storedBasket = localStorage.getItem("basket");
    return storedBasket ? JSON.parse(storedBasket) : [];
  });

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const addToBasket = (produkt) => {
    setBasket([...basket, produkt]);
  };

  const removeFromBasket = (index) => {
    setBasket((prevBasket) => prevBasket.filter((_, i) => i !== index));
  };

  const clearBasket = () => setBasket([]);

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        basket,
        addToBasket,
        clearBasket,
        removeFromBasket,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
