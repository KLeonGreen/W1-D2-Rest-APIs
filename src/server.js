import express from "express";
import authorsRouter from "./api/users/index.js";
import listEndpoints from "list-endpoints-express";

const server = express();
const port = 3009;

server.use(express.json());

server.use("/authors", authorsRouter);

server.listen(port, () => {
  console.log(`listening on port ${port}`);
  console.table(listEndpoints(server));
});
