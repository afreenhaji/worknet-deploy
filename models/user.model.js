import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
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
    profileImage: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    headline: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    skill: {
      type: [String],
      default: [],
    },
    education: {
      type: [
        {
          college: { type: String },
          degree: { type: String },
          fieldOfStudy: { type: String },  // typo fixed here
        },
      ],
      default: [],
    },
    location: {
      type: String,
      default: "India",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    experience: {
      type: [
        {
          title: { type: String },
          company: { type: String },
          description: { type: String },
        },
      ],
      default: [],
    },
    connection: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
