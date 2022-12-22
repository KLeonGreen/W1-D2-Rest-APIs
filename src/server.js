import express from "express";
import authorsRouter from "./api/users/index.js";
import blogRouter from "./api/blogs/index.js";
import filesRouter from "./api/files/index.js";
import listEndpoints from "list-endpoints-express";
import cors from "cors";
import { join } from "path";
import { badRequestHandler, unauthorizedHandler, notFoundHandler, genericHandler } from "./errorHandler.js";

const server = express();
const port = 3001;
const publicPATH = join(process.cwd(), "./public");

server.use(express.json());

server.use(express.static(publicPATH));

server.use(cors());

server.use("/authors", authorsRouter);
server.use("/blogs", blogRouter);
server.use("/cover", filesRouter);

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericHandler);

server.listen(port, () => {
  console.log(`listening on port ${port}`);
  console.table(listEndpoints(server));
});
