import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Flex, Box, Grid, GridItem, Text } from "@chakra-ui/react";

function Product() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category_id === selectedCategory)
    : products;

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:3001/product/view");
      setProducts(res.data.result);
    };
    fetchProducts();
  }, []);

  const sortedProducts = sortOption
    ? [...filteredProducts].sort((a, b) => {
        if (sortOption === "price_asc") {
          return a.price - b.price;
        } else if (sortOption === "price_desc") {
          return b.price - a.price;
        }
      })
    : filteredProducts;

  return (
    <Box mt={10}>
      <Button onClick={() => setSortOption("price_asc")} mr={2}>
        Sort by Price (Low to High)
      </Button>
      <Button onClick={() => setSortOption("price_desc")}>
        Sort by Price (High to Low)
      </Button>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {sortedProducts.map((product) => (
          <GridItem key={product.id}>
            <Box borderWidth="1px" borderRadius="lg" p={4}>
              <Text fontWeight="bold">{product.name}</Text>
              <Text fontSize="sm" mt={2}>
                {product.categories.category_name}
              </Text>
              <Text fontSize="sm" mt={2}>
                {product.price}
              </Text>
              <Text fontSize="sm" mt={2}>
                {product.stock}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default Product;
