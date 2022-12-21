import express from "express";
import fs from "fs";
import { dirname, join } from "path";
import uniqid from "uniqid";
import { fileURLToPath } from "url";

const currentPath = import.meta.url;
const currentPathtoURL = fileURLToPath(currentPath);
const parentPath = dirname(currentPathtoURL);
const blogJSONfilePath = join(parentPath, "blog.json");

const blogRouter = express.Router();

const getBlogs = () => {
  return JSON.parse(fs.readFileSync(blogJSONfilePath));
};

const addBlogs = (array) => {
  fs.writeFileSync(blogJSONfilePath, JSON.stringify(array));
};

blogRouter.post("/", (request, response) => {
  const newBlog = { ...request.body, date: new Date(), id: uniqid() };
  const blogArray = getBlogs();
  blogArray.push(newBlog);
  addBlogs(blogArray);

  response.status(201).send(newBlog);
});

export default blogRouter;
