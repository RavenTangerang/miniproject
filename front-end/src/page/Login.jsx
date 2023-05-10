import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setEmailError("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }

    if (email && password) {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          email,
          password,
        });

        console.log(response.data);
        // set token to local storage or context
      } catch (error) {
        console.error(error);
        // handle error response
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="email" isRequired isInvalid={emailError}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <FormErrorMessage>{emailError}</FormErrorMessage>
      </FormControl>

      <FormControl id="password" isRequired isInvalid={passwordError}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <FormErrorMessage>{passwordError}</FormErrorMessage>
      </FormControl>

      <Button type="submit" colorScheme="teal" size="lg" mt={6}>
        Sign in
      </Button>
    </form>
  );
}

export default Login;
