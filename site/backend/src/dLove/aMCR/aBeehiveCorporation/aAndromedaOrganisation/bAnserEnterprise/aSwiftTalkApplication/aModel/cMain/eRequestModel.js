const mongoose = require('mongoose');
const slugify = require('slugify');
const timezone = require('moment-timezone');
const defaultSchema = require('../../../../../../../bFunction/jDefaultSchema');

const schema = new mongoose.Schema({
  ...defaultSchema,

  cReceivedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },    

  dStatus: {
    type: String,
    default: "pending",
    enum: ["pending", "accepted", "rejected"]
  }
})

// Pre Save
// Slugify Title
schema.pre("save", async function() {
  this.aSlug = slugify(this.aTitle);
})

module.exports = mongoose.model("RequestModel", schema)
