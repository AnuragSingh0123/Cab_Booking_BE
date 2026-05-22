const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  bookRide,
  getMyBookings,
  getBookingById,
  updateBooking,
} = require("../controllers/rideController");


router.post("/", authMiddleware, bookRide);


router.get("/", authMiddleware, getMyBookings);


router.get("/:id", getBookingById);

router.patch("/:id", authMiddleware, updateBooking);

module.exports = router;