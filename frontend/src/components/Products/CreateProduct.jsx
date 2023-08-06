import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { createNewProduct } from "../../store/productSlice";

const CreateProduct = ({ showToast }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    color: "",
    size: "",
    stock: "",
    image: null,
  });

  const handleChange = (e) => {
    console.log("handleChange triggered:", e.target.value); // Add this line
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: imageFile,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const { image, ...productData } = formData;
      const formDataWithImage = new FormData();
      formDataWithImage.append("images", image);
      for (const key in productData) {
        formDataWithImage.append(key, productData[key]);
      }

      setLoading(true);
      await dispatch(createNewProduct({ formData: formDataWithImage, token }));
      setLoading(false);

      showToast("Product created successfully!", "success");
      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);
      setLoading(false);
      showToast("Error creating product. Please try again.", "error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create a New Product
      </Typography>
      <Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="shoes">Shoes</MenuItem>
              <MenuItem value="accessories">Accessories</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel>Size</FormLabel>
            <RadioGroup
              aria-label="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="S" control={<Radio />} label="S" />
              <FormControlLabel value="M" control={<Radio />} label="M" />
              <FormControlLabel value="L" control={<Radio />} label="L" />
              {/* Add more size options as needed */}
            </RadioGroup>
          </FormControl>
          <TextField
            label="Stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Product
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateProduct;
