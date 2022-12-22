import express from "express";
import fs from "fs";
import { dirname, join } from "path";
import uniqid from "uniqid";
import { fileURLToPath } from "url";
import { checkBlogSchema, getbadRequest } from "./validator.js";

const currentPath = import.meta.url;
const currentPathtoURL = fileURLToPath(currentPath);
const parentPath = dirname(currentPathtoURL);
const blogJSONfilePath = join(parentPath, "blog.json");

const blogRouter = express.Router();

const getBlogs = () => {
  return JSON.parse(fs.readFileSync(blogJSONfilePath));
};

const addBlogs = (array) => {
  return fs.writeFileSync(blogJSONfilePath, JSON.stringify(array));
};

blogRouter.post("/", checkBlogSchema, getbadRequest, (request, response, next) => {
  try {
    const newBlog = { ...request.body, date: new Date(), id: uniqid() };
    const blogArray = getBlogs();
    blogArray.push(newBlog);
    addBlogs(blogArray);

    response.status(201).send(newBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.get("/", (request, response) => {
  const blogArray = getBlogs();
  response.status(201).send(blogArray);
});

blogRouter.get("/:id", (request, response) => {
  const id = request.params.id;
  const blogArray = getBlogs();
  const blog = blogArray.find((blog) => blog.id === id);
  response.send(blog);
});

blogRouter.put("/:id", (request, response) => {
  const id = request.params.id;
  const blogArray = getBlogs();
  const editedblogindex = blogArray.findIndex((blog) => blog.id === id);
  const oldBlog = blogArray[editedblogindex];
  const newBlog = { ...oldBlog, ...request.body, updated: new Date() };
  blogArray[editedblogindex] = newBlog;
  addBlogs(blogArray);
  response.status(200).send(newBlog);
});

blogRouter.delete("/:id", (request, response) => {
  const id = request.params.id;
  const blogArray = getBlogs();
  const remainingBlogs = blogArray.filter((blog) => blog.id !== id);
  addBlogs(remainingBlogs);
  response.status(200).send(remainingBlogs);
});

export default blogRouter;
