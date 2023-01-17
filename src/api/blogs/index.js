import express from "express";
import uniqid from "uniqid";
import { getBlogs, addBlogs } from "../../library/fs-tools.js";
import { checkBlogSchema, getbadRequest } from "./validator.js";
import blogModel from "./model.js";

const blogRouter = express.Router();

blogRouter.post("/", checkBlogSchema, getbadRequest, async (request, response, next) => {
  try {
    const newBlog = new blogModel(request.body);
    await newBlog.save();
    response.status(200).send(newBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await blogModel.find();
    response.status(200).send(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    const blog = await blogModel.findById(id);
    response.status(200).send(blog);
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    const editedBlog = await blogModel.findByIdAndUpdate(id, request.body, { new: true, runValidators: true });
    response.status(200).send(editedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    const blog = await blogModel.findByIdAndDelete(id);
    response.status(200).send("Deleted");
  } catch (error) {
    next(error);
  }
});

export default blogRouter;
