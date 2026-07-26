const express = require("express");
const router = express.Router();

const {
  createLink,
  getLinks,
} = require("../controllers/linkController");

router.post("/", createLink);
router.get("/", getLinks);

module.exports = router;