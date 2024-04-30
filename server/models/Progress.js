const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  history: [
    {
      date: Date,
      weight: Number,
      reps: Number
    },
  ],
});

module.exports = mongoose.model("Progress", progressSchema);
