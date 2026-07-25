const linkRoutes = require("./routes/linkRoutes");
const express = require("express");
const cors = require("cors");
const { redirectLink } = require("./controllers/linkController");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/links", linkRoutes);
app.get("/:shortCode", redirectLink);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Link Shortener API running",
  });
});

module.exports = app;