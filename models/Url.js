const mongoose = require("mongoose");

const Url = new mongoose.Schema({
  slug: {
      type: String,
  },
  webUrl: {
      type: String
  },
  click: {
      type: Number,
      default: 0
  },
  createdAt: { type: Date, expires: "60m", default: Date.now },
});

module.exports = mongoose.model("Url", Url);