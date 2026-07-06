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
    select: false,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER", "SUPERADMIN"],
    default: "USER",
  },
});

//* user model
const User = mongoose.model("user", userSchema);
export default User;
