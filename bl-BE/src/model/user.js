import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    fullName: {
      type: String,
      require: true
    },
    gender: {
      type: String,
    },
    aboutme: {
      type: String,
    },
    address: {
      type: String,
    },
    district: {
      type: String,
    },
    commune: {
      type: String,
    },
    city: {
      type: String,
    },
    tel: {
      type: String
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role_id: {
      type: mongoose.Types.ObjectId,
      ref: "Role"
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);
