import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { getAllProducts } from "../../store/productSlice";
import { baseUrl } from "../../utils/constants";
import { MyContext } from "../../Context/AppContext";
import Loading from "../../utils/Loading";
import { addToCart } from "../../store/cartSlice";

const styles = {
  root: {
    padding: "16px",
  },
  sectionTitle: {
    marginBottom: "16px",
    marginTop: "16px",
    marginLeft: "5px",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  paper: {
    padding: "16px",
    textAlign: "center",
    color: "#333",

    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
  },
  productName: {
    marginBottom: "8px",
    fontWeight: "bold",
  },
  productDescription: {
    marginBottom: "16px",
  },
  productImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    marginBottom: "16px",
  },
  addToCartButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },

  searchContainer: {
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginRight: "16px",
  },
  filterContainer: {
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  filterLabel: {
    marginRight: "8px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  filterSelect: {
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginRight: "16px",
  },
  filterInput: {
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginRight: "16px",
    width: "80px",
  },
};

const AllProducts = ({ showToast }) => {
  const dispatch = useDispatch();
  const { user } = useContext(MyContext);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    size: "",
    color: "",
    minPrice: "",
    maxPrice: "",
  });
  const products = useSelector((state) => state.product.products);
  const handleAddToCart = (product) => {
    if (user) {
      dispatch(addToCart({ productId: product._id, quantity: 1 }));
      showToast("Product added to cart");
    } else {
      showToast("Please log in to add to cart");
    }
  };

  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [dispatch]);

  const categories = {};
  products?.forEach((product) => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  });
  const filteredProducts = products
    .filter((product) => {
      const nameMatches = product?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const categoryMatches = product?.category
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      return nameMatches || categoryMatches;
    })
    .filter((product) => {
      const sizeMatches =
        !selectedFilters.size || product.size === selectedFilters.size;
      const colorMatches =
        !selectedFilters.color || product.color === selectedFilters.color;
      const priceMatches =
        (!selectedFilters.minPrice ||
          product.price >= parseFloat(selectedFilters.minPrice)) &&
        (!selectedFilters.maxPrice ||
          product.price <= parseFloat(selectedFilters.maxPrice));
      return sizeMatches && colorMatches && priceMatches;
    });
  return (
    <div style={styles.root}>
      {loading ? (
        <Loading isLoading={loading} />
      ) : (
        <>
          <Box
            sx={{
              border: "2px solid white",
              borderRadius: "10px",
              p: 2,
            }}
          >
            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            {/* Filtering Options */}
            <div style={styles.filterContainer}>
              <label style={styles.filterLabel}>Size:</label>
              <select
                value={selectedFilters.size}
                onChange={(e) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    size: e.target.value,
                  })
                }
                style={styles.filterSelect}
              >
                <option value="">All Sizes</option>
                {/* Add size options here */}
              </select>

              <label style={styles.filterLabel}>Color:</label>
              <select
                value={selectedFilters.color}
                onChange={(e) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    color: e.target.value,
                  })
                }
                style={styles.filterSelect}
              >
                <option value="">All Colors</option>
                {/* Add color options here */}
              </select>

              <label style={styles.filterLabel}>Min Price:</label>
              <input
                type="number"
                value={selectedFilters.minPrice}
                onChange={(e) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    minPrice: e.target.value,
                  })
                }
                style={styles.filterInput}
              />

              <label style={styles.filterLabel}>Max Price:</label>
              <input
                type="number"
                value={selectedFilters.maxPrice}
                onChange={(e) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    maxPrice: e.target.value,
                  })
                }
                style={styles.filterInput}
              />
            </div>
          </Box>

          {Object.entries(categories).map(([category, products]) => (
            <div key={category}>
              <Typography variant="h2" style={styles.sectionTitle}>
                {category.toUpperCase()}
              </Typography>
              <Grid container spacing={3}>
                {filteredProducts
                  .filter((product) => product.category === category)
                  .map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                      <Paper style={styles.paper}>
                        <Box>
                          <img
                            src={`${baseUrl}/${product.images[0]}`}
                            alt={product.name}
                            style={styles.productImage}
                          />
                          <Typography variant="h6" style={styles.productName}>
                            {product.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={styles.productDescription}
                          >
                            {product.description}
                          </Typography>
                          <Typography variant="subtitle1">
                            Price: ${product.price.toFixed(2)}
                          </Typography>
                          <Typography variant="subtitle1">
                            Color: {product.color}
                          </Typography>
                          <Typography variant="subtitle1">
                            Size: {product.size}
                          </Typography>

                          <Button
                            variant="contained"
                            style={styles.addToCartButton}
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AllProducts;
