import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import RegisterPopover from "./components/Register";
import { jwtDecode } from "jwt-decode";
import { Flex, VStack, StackSeparator, Text, Button } from "@chakra-ui/react";

function App() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Initialize token state safely
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        if (storedToken.split(".").length === 3) {
          setToken(storedToken);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
        }
      } catch (e) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          handleLogout();
        }
      } catch (e) {
        handleLogout();
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
  };

  const handleLoginSuccess = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  let decodedToken = null;
  try {
    decodedToken = token ? jwtDecode(token) : null;
  } catch (e) {
    console.error("Failed to decode token:", e);
    handleLogout();
  }

  return (
    <>
      <Flex align={"center"} justify="space-between" padding={4} h="100vh">
        {isLoggedIn ? (
          <VStack gap={10} mx="auto" h="50vh">
            <Text>Witaj, {decodedToken?.username}</Text>
            <Button onClick={handleLogout}>Wyloguj</Button>
          </VStack>
        ) : (
          <VStack gap={10} mx="auto" separator={<StackSeparator />} h="50vh">
            <Login onLoginSuccess={handleLoginSuccess} />
            <RegisterPopover />
          </VStack>
        )}
      </Flex>
    </>
  );
}

export default App;
