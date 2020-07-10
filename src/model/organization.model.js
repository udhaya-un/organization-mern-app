const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    crn:{
      type: String,
      required: true,
      trim: true,
    },
    cin:{
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    business:{
      type: String,
      required: true,
      trim: true,
    },
    type:{
      type: String,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    useNestedStrict: true,
    toJSON: { virtuals: true },
  }
);
module.exports = mongoose.model("organizations", organizationSchema);
