import mongoose from "mongoose";

//* user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//* user model
const userModel = mongoose.model("user", userSchema);
export default userModel;
