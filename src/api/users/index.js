import express, { response, Router } from "express";
import fs from "fs";
import { dirname, join } from "path";
import uniqid from "uniqid";
import { fileURLToPath } from "url";

const currentPath = import.meta.url;
const currentPathtoURL = fileURLToPath(currentPath);
const parentPath = dirname(currentPathtoURL);

const authorsJSONfilePath = join(parentPath, "authors.json");

const authorsRouter = express.Router();

authorsRouter.post("/", (request, response) => {
  console.log("added author", request.body);
  const newAuthor = { ...request.body, date: new Date(), id: uniqid() };
  console.log("saved author", newAuthor);

  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONfilePath));
  authorsArray.push(newAuthor);
  fs.writeFileSync(authorsJSONfilePath, JSON.stringify(authorsArray));
  response.status(201).send(newAuthor);
});

authorsRouter.get("/", (request, response) => {
  const authorsbuffer = fs.readFileSync(authorsJSONfilePath);
  const allAuthors = JSON.parse(authorsbuffer);
  response.send(allAuthors);
});

export default authorsRouter;
