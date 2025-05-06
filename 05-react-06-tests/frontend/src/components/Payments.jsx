import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import axios from "axios";
import { Box, Button, Input, Alert, Heading, VStack } from "@chakra-ui/react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";

function Payments() {
  const { basket, clearBasket } = useShop();
  const sum = basket.reduce((s, p) => s + p.price, 0);

  //bogowie frontendu, wybaczcie mi za to
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const validateCard = () => /^\d{16}$/.test(cardNumber);
  const validateExpiry = () => /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
  const validateCvv = () => /^\d{3}$/.test(cvv);
  const validateName = () => /^[A-Za-z\s]+$/.test(name);

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:8080/payment", {
        products: basket,
        sum,
      });

      setStatus("success");
      setMessage("Payment ended successfully: " + response.data.status);

      clearBasket();
      setCardNumber("");
      setExpiry("");
      setCvv("");
      setName("");
    } catch (error) {
      let errorMessage = "Payment failed. Please try again.";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorMessage = `Payment failed: ${
            error.response.data.message || error.response.statusText
          }`;
        } else if (error.request) {
          errorMessage =
            "No response from payment server. Please check your connection.";
        } else {
          errorMessage = "Payment request setup failed: " + error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = "Payment failed: " + error.message;
      }

      setStatus("error");
      setMessage(errorMessage);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={10}>
      <Heading as="h2" size="lg" mb={4}>
        Payment
      </Heading>
      <p>{sum} zł</p>
      <VStack spacing={8} my={10} minH="325px">
        <FormControl isInvalid={!validateName() && name !== ""}>
          <FormLabel>Cardholder Name</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Test Testowy"
          />
          <FormErrorMessage fontSize={10} color="red">
            Name must contain only letters and spaces.
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!validateCard() && cardNumber !== ""}>
          <FormLabel>Card Number</FormLabel>
          <Input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234567812345678"
            maxLength={16}
            inputMode="numeric"
          />
          <FormErrorMessage fontSize={10} color="red">
            Card number must be 16 digits.
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!validateExpiry() && expiry !== ""}>
          <FormLabel>Expiry Date (MM/YY)</FormLabel>
          <Input
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            maxLength={5}
          />
          <FormErrorMessage fontSize={10} color="red">
            Expiry must be in MM/YY format.
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!validateCvv() && cvv !== ""}>
          <FormLabel>CVV</FormLabel>
          <Input
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            maxLength={3}
            inputMode="numeric"
          />
          <FormErrorMessage fontSize={10} color="red">
            CVV must be 3 digits.
          </FormErrorMessage>
        </FormControl>
      </VStack>

      <Button
        onClick={handlePayment}
        width="full"
        disabled={
          !validateCard() ||
          !validateExpiry() ||
          !validateCvv() ||
          !validateName() ||
          sum === 0
        }
      >
        Pay
      </Button>

      {status && (
        <Alert.Root status={status}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Description>{message}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
    </Box>
  );
}

export default Payments;
