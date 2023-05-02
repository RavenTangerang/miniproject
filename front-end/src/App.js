import * as React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Product from "./page/product";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
