const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    pickup: {
      type: String,
      required: true,
    },
    drop: {
      type: String,
      required: true,
    },

    distance: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },

    fare: {
      type: Number,
      required: true,
    },
    gst: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },

    vehicle: {
      type: String,
      required: true,
    },

    pickUpCoordinates: {
      type: [Number],
      required: true,
    },

    dropCoordinates: {
      type: [Number],
      required: true,
    },

    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rejectedDrivers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
      },
    ],
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      default: null,
    },
    status: {
      type: String,
      enum: ["requested", "accepted", "started", "completed", "cancelled"],
      default: "requested",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
