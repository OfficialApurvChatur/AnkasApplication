const mongoose = require('mongoose');
const slugify = require('slugify');
const timezone = require('moment-timezone');
const defaultSchema = require('../../../../../../../bFunction/jDefaultSchema');

const schema = new mongoose.Schema({
  ...defaultSchema,

  cMembers: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }
  ],

  dIsGroupChat: { type: Boolean, default: false },

})

// Pre Save
// Slugify Title
schema.pre("save", async function() {
  this.aSlug = slugify(this.aTitle);
})

module.exports = mongoose.model("ChatModel", schema)
