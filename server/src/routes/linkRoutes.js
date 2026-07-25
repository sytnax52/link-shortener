const express = require("express");
const {
  createLink,
  redirectLink,
} = require("../controllers/linkController");

const router = express.Router();

router.post("/", createLink);

module.exports = router;
router.get("/:shortCode", redirectLink);