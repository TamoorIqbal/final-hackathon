import { Product } from "../models/ProductsModel.js";

// Create a new post
export const createProduct = async (req, res) => {
  try {
    const { name, category, description, price, color, size, stock } = req.body;
    const product = new Product({
      author: req.user?._id,
      name,
      category,
      description,
      price,
      color,
      size,
      images: req.file.path,
      stock,
    });

    const savedProduct = await product.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the product." });
  }
};

//getAllProducts

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving products." });
  }
};
