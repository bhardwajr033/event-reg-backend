const express = require("express");
const cors = require("cors");

const formRouter = require("./Routes/RegForm");

const PORT = process.env.PORT || 8001;

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors());

app.use("/form", formRouter);

app.use("/*", (req, res) => {
  res.status(404).send({ Error: "request h not found" });
});

app.listen(PORT, () => {
  console.log(`Server has started at ${PORT}`);
});
