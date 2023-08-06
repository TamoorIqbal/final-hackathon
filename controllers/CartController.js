import Cart from "../models/CartModel.js";
import { Product } from "../models/ProductsModel.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: quantity }],
      });
    } else {
      const existingCartItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity: quantity });
      }
    }

    await cart.save();

    res.status(201).json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding to cart." });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product", "_id name price images",)
      .exec();

    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the cart." });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    console.log("cart", cart);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    // Check if the product exists in the cart
    const existingCartItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingCartItemIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart." });
    }

    cart.items.splice(existingCartItemIndex, 1);

    await cart.save();

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res
      .status(500)
      .json({ error: "An error occurred while removing product from cart." });
  }
};
