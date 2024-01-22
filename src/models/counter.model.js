const mongoose = require("mongoose");

// Schema for auto incremental Number ids.
const CounterSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("counter", CounterSchema);
