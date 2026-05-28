const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  bookRide,
  getBookingById,
  updateBooking,
  getMyTrips,
} = require("../controllers/rideController");


router.post("/", authMiddleware, bookRide);

router.get("/", authMiddleware, getMyTrips);

router.get("/:id", getBookingById);

router.patch("/:id", authMiddleware, updateBooking);

module.exports = router;