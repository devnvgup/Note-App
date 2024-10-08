import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AuthorModel = mongoose.model("Author", authorSchema);
export default AuthorModel;
