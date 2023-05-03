import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Flex,
  Box,
  Grid,
  GridItem,
  Text,
  Select,
} from "@chakra-ui/react";

function Product() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category_id == selectedCategory)
    : products;
  console.log(typeof selectedCategory);
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

  const handleCategoryFilter = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
  };

  return (
    <Box mt={10}>
      <Flex alignItems="center" mb={2}>
        <Box mr={2}>
          <Select placeholder="All Categories" onChange={handleCategoryFilter}>
            <option value={1}>Category 1</option>
            <option value={2}>Category 2</option>
            <option value={3}>Category 3</option>
            {/* Add more categories here */}
          </Select>
        </Box>
        <Button onClick={() => setSortOption("price_asc")} mr={2}>
          Sort by Price (Low to High)
        </Button>
        <Button onClick={() => setSortOption("price_desc")}>
          Sort by Price (High to Low)
        </Button>
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {sortedProducts.map((product) => (
          <GridItem key={product.id}>
            <Box borderWidth="1px" borderRadius="lg" p={4}>
              <Text fontWeight="bold">{product.name}</Text>
              <Text fontSize="sm" mt={2}>
                {product["Category.category_name"]}
              </Text>
              <Text fontSize="sm" mt={2}>
                {console.log(typeof product.category_id)}
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
