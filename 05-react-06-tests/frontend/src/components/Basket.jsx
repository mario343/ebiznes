import React from "react";
import { useShop } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Box,
  CloseButton,
  EmptyState,
  VStack,
  List,
} from "@chakra-ui/react";
import { LuShoppingCart } from "react-icons/lu";
import { Separator } from "@chakra-ui/react";

function Basket() {
  const { basket, removeFromBasket } = useShop();

  const sum = basket.reduce((s, p) => s + p.price, 0);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/payment");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
      }}
    >
      {basket.length === 0 ? (
        <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Indicator>
              <LuShoppingCart />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>Your cart is empty</EmptyState.Title>
              <EmptyState.Description>
                Explore our products and add items to your cart
              </EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      ) : (
        <VStack spacing={4}>
          <List.Root as="ol">
            {basket.map((p, i) => (
              <List.Item key={i}>
                <Flex justify="space-between" align="center" w="100%">
                  <Box>
                    {p.name} - {p.price} zł
                  </Box>
                  <CloseButton
                    onClick={() => removeFromBasket(i)}
                    size="xs"
                    color={"red.500"}
                    _hover={{ bg: "red.700" }}
                    ml={2}
                  />
                </Flex>
                <Separator />
              </List.Item>
            ))}
          </List.Root>
          <p>
            <strong>Sum:</strong> {sum} zł
          </p>

          <Button
            onClick={handleClick}
            backgroundColor="blue"
            color="white"
            size={"sm"}
            _hover={{ bg: "blue.700" }}
          >
            Proceed to payment
          </Button>
        </VStack>
      )}
    </div>
  );
}

export default Basket;
