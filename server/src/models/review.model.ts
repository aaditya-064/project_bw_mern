import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User ID is required"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",

      required: [true, "Product ID is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      default: 0,
      min: 1,
      max: 5,
    },
    text: {
      type: String,
      trim: true,
      minLength: 5,
      maxLength: 500,
    },
  },
  { timestamps: true },
);

const Review = mongoose.model("review", reviewSchema);
export default Review;
