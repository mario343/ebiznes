import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
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

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: ShopProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [basket, setBasket] = useState<Product[]>(() => {
    const storedBasket = localStorage.getItem("basket");
    return storedBasket ? JSON.parse(storedBasket) : [];
  });

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const addToBasket = (produkt: Product) => {
    setBasket([...basket, produkt]);
  };

  const removeFromBasket = (index: number) => {
    setBasket((prevBasket) => prevBasket.filter((_, i) => i !== index));
  };

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
    [products, basket]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
