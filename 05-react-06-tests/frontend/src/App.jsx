import React from "react";
import Products from "./components/Products";
import Basket from "./components/Basket";
import Payments from "./components/Payments";
import { Flex, Link } from "@chakra-ui/react";
import { useShop } from "./context/ShopContext";
import { useNavigate, Routes, Route } from "react-router-dom";

function App() {
  const { basket } = useShop();
  const navigate = useNavigate();

  const sum = basket.reduce((s, p) => s + p.price, 0);

  return (
    <>
      <Flex align={"center"} justify="space-between" padding={4}>
        <Flex gap={4} fontSize={"xl"}>
          <Link onClick={() => navigate("/")}>Products</Link>
          <Link onClick={() => navigate("/basket")}>Basket</Link>
        </Flex>
        {sum > 0 && (
          <Link fontSize={"sm"} onClick={() => navigate("/basket")}>
            Basket value: {sum} zł
          </Link>
        )}
      </Flex>

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/payment" element={<Payments />} />
      </Routes>
    </>
  );
}

export default App;
