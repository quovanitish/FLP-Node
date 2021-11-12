const express = require("express");
const userRouteHandler = require("./router/userRouteHandler");
const { routeNotFound } = require("./controllers/errorHandler");
const { errorHandlerMiddleware } = require("./middlewares/errorMiddlewares");

const PORT = process.env.PORT || 3000;

const app = express();
app.get("/", (req, res) => {
  res.send({ response: "Use /user to interact" });
});

app.use(express.json());
app.use(userRouteHandler);
app.use(routeNotFound);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is up and running at: ${PORT}`);
});
