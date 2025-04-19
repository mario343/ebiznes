import React, { useEffect } from "react";
import axios from "axios";
import { useShop } from "../context/ShopContext";
import { Button } from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";

const Products = () => {
  const { products, setProducts, addToBasket } = useShop();

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania produktów:", error);
      });
  }, [setProducts]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
      }}
    >
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <Table.Root
          size="sm"
          alignSelf="center"
          justifyContent="center"
          interactive
          maxW="50vh"
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader fontWeight={900}>Product</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end" fontWeight={900}>
                Price
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {products.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell textAlign="end">{item.price} zł</Table.Cell>
                <Table.Cell textAlign="end">
                  <Button
                    onClick={() => addToBasket(item)}
                    size={"xs"}
                    bg={"blue.500"}
                    color={"white"}
                    _hover={{ bg: "blue.900" }}
                  >
                    Add
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
};

export default Products;
