import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://example.com/api/register",
        formData
      );
      console.log(response.data);
      // handle successful registration
    } catch (error) {
      console.error(error.response.data);
      // handle registration error
    }
  };

  return (
    <Box w="-webkit-fit-content" maxW="lg" mx="auto" py={6} px={4}>
      <form onSubmit={handleSubmit}>
        <FormControl id="fullName" isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your full name"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"
            title="Please enter a valid name (only letters, spaces, and the following characters are allowed: ',.-)"
          />
        </FormControl>

        <FormControl id="email" isRequired mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email address"
            id="email"
            value={formData.email}
            onChange={handleChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address"
          />
        </FormControl>

        <FormControl id="password" isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            title="Password must contain at least 8 characters including at least 1 uppercase letter, 1 lowercase letter, and 1 number"
          />
        </FormControl>

        <FormControl id="confirmPassword" isRequired mt={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            placeholder="Confirm your password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            pattern={formData.password}
            title="Passwords do not match"
          />
        </FormControl>

        <Button type="submit" colorScheme="teal" size="lg" mt={8}>
          Register
        </Button>
      </form>
    </Box>
  );
}

export default Register;
