// name, description, logo
import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    maxLength: [500, "description should be limited"],
  },
  logo: {
    type: String,
  },
});

const Brand = mongoose.model("brand", brandSchema);
export default Brand;
