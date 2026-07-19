import mongoose, { Schema, Document } from "mongoose";

export interface IWishlist extends Document {
  user_id: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
}

const wishlistSchema = new Schema<IWishlist>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User ID is required"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: [true, "Product ID is required"],
    },
  },
  { timestamps: true },
);

wishlistSchema.index({ user_id: 1, product: 1 }, { unique: true });

const Wishlist = mongoose.model<IWishlist>("wishlist", wishlistSchema);
export default Wishlist;
