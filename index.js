const express = require("express");

const formRouter = require("./Routes/RegForm");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/form", formRouter);

app.use("/*", (req, res) => {
  res.status(404).send({ Error: "request h not found" });
});

app.listen(PORT, () => {
  console.log(`Server has started at ${PORT}`);
});
