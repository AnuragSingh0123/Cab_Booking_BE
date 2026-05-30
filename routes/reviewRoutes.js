const express = require("express");
const router = express.Router();
const { submitFeedback } = require("../controllers/reviewController");

router.post("/", submitFeedback);

module.exports = router;
