const mongoose = require("mongoose");
const groupSchema = mongoose.Schema({
  name: {
    type: Types.String,
    required: true,
  },
  description: {
    type: Types.String,
  },
});

module.exports = mongoose.model("Group", groupSchema);
