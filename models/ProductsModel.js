import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["clothing", "shoes", "accessories"],
    required: true,
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  images: [{ type: String, required: true }],
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  ratings: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      review: { type: String, required: true },
    },
  ],
  stock: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Product = model("Product", productSchema);
