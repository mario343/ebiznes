import React, { useState } from "react";
import axios from "axios";
import { toaster } from "./ui/toaster";
import { AuthForm, AuthInput } from "./AuthForm";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        { username, password },
        { validateStatus: (status) => status < 500 }
      );
      console.log(response);
      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        onLoginSuccess(token);
        toaster.success({
          title: "Zalogowano",
          description: `Witaj, ${username}!`,
        });
      } else {
        const errorMessage =
          response.data?.error || "Nieprawidłowe dane logowania";
        setError(errorMessage);
        toaster.error({
          title: "Nie udało się zalogować",
          description: errorMessage,
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Nie udało się zalogować. Spróbuj ponownie później.";
      setError(errorMessage);
      toaster.error({
        title: "Error",
        description: errorMessage,
      });
    }
  };

  return (
    <AuthForm
      title="Logowanie"
      onSubmit={handleLogin}
      error={error}
      buttonText="Zaloguj"
    >
      <AuthInput
        label="Nazwa użytkownika"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <AuthInput
        label="Hasło"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </AuthForm>
  );
}

export default Login;
