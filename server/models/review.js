const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },

    feedback: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);