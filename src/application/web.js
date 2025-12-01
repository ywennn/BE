const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
const publicApiRoutes = require("../routes/public-api");

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use("/api", publicApiRoutes);

module.exports = app;
