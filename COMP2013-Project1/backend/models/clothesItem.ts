import mongoose from "mongoose";

const clothesItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  fit: {
    type: String,
    enum: ["men", "women", "kids"],
    required: true,
  },
  category: {
    type: String,
    enum: ["t-shirt", "hoodie", "shorts", "shirt", "pants"],
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL", "XXL"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  itemQuantity: {
    type: Number,
    required: true,
  },
});

// exporting

export default mongoose.model("ClothesItem", clothesItemSchema, "clothesItems");
