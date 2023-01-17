import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogSchema = new Schema(
  {
    category: { type: "string", required: true },
    title: { type: "string", required: true },
    cover: { type: "string", required: false },
    readTime: {
      value: { type: "number", required: true },
      unit: { type: "string", required: true },
    },
    author: {
      name: { type: "string" },
      avatar: { type: "string" },
    },
    content: { type: "string" },
  },
  { timestamps: true }
);

export default model("blog", blogSchema);
