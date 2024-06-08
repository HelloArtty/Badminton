const { Schema, model } = require("mongoose");

const CourtTime = require("./courtTime");
const User = require("./user");

// Function to adjust date to UTC+7
function adjustToUTC7(date) {
  const offset = 7 * 60; // UTC+7 in minutes
  return new Date(date.getTime() + offset * 60000);
}

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courtTime: {
      type: Schema.Types.ObjectId,
      ref: "CourtTime",
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save hook to adjust timestamps to UTC+7
bookingSchema.pre("save", function (next) {
  if (this.isNew) {
    this.createdAt = adjustToUTC7(this.createdAt);
    this.updatedAt = adjustToUTC7(this.updatedAt);
  } else {
    this.updatedAt = adjustToUTC7(new Date());
  }
  next();
});

// Pre-update hook to adjust timestamps to UTC+7
bookingSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = adjustToUTC7(new Date());
  next();
});

const Booking = model("Booking", bookingSchema);
module.exports = Booking;
