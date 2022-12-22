import express from "express";
import authorsRouter from "./api/users/index.js";
import blogRouter from "./api/blogs/index.js";
import listEndpoints from "list-endpoints-express";
import cors from "cors";
import { badRequestHandler, unauthorizedHandler, notFoundHandler, genericHandler } from "./errorHandler.js";

const server = express();
const port = 3001;

server.use(express.json());

server.use(cors());

server.use("/authors", authorsRouter);
server.use("/blogs", blogRouter);

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericHandler);

server.listen(port, () => {
  console.log(`listening on port ${port}`);
  console.table(listEndpoints(server));
});
