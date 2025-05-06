import React, { useState } from "react";
import axios from "axios";
import { Button, Popover, useDisclosure } from "@chakra-ui/react";
import { toaster } from "./ui/toaster";
import { AuthForm, AuthInput } from "./AuthForm";

function RegisterPopover() {
  const { onClose } = useDisclosure();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.error) {
        toaster.error({
          title: "Błąd rejestracji",
          description: response.data.error,
        });
        setError(response.data.error);
      } else if (response.data.message) {
        toaster.info({
          title: "Rejestracja zakończona",
          description: response.data.message,
        });
        setUsername("");
        setPassword("");
        setError("");
        onClose();
      }
    } catch (error) {
      setError("Błąd rejestracji");
      toaster.error({
        title: "Błąd",
        description: "Nie udało się zarejestrować użytkownika.",
      });
    }
  };
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button bg="#00215a" _hover={{ bg: "#4d648c" }}>
          Zarejestruj się
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Body>
          <AuthForm
            onSubmit={handleRegister}
            error={error}
            title="Rejestracja"
            buttonText="Zarejestruj"
          >
            <AuthInput
              label="Nazwa użytkownika"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <AuthInput
              label="Hasło"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </AuthForm>
        </Popover.Body>
      </Popover.Content>
    </Popover.Root>
  );
}

export default RegisterPopover;
