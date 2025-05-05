import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useContext,
  useCallback,
} from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ShopContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  basket: Product[];
  addToBasket: (produkt: Product) => void;
  removeFromBasket: (index: number) => void;
  clearBasket: () => void;
}

interface ShopProviderProps {
  children: ReactNode;
}

export const ShopContext = createContext<ShopContextType | undefined>(
  undefined
);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};

export const ShopProvider = ({ children }: ShopProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [basket, setBasket] = useState<Product[]>(() => {
    const storedBasket = localStorage.getItem("basket");
    return storedBasket ? JSON.parse(storedBasket) : [];
  });

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const addToBasket = useCallback((product: Product) => {
    setBasket((prevBasket) => [...prevBasket, product]);
  }, []);

  const removeFromBasket = useCallback((index: number) => {
    setBasket((prevBasket) => {
      const newBasket = [...prevBasket];
      newBasket.splice(index, 1);
      return newBasket;
    });
  }, []);

  const clearBasket = () => setBasket([]);
  const value = useMemo(
    () => ({
      products,
      setProducts,
      basket,
      addToBasket,
      clearBasket,
      removeFromBasket,
    }),
    [products, basket, addToBasket, removeFromBasket]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
