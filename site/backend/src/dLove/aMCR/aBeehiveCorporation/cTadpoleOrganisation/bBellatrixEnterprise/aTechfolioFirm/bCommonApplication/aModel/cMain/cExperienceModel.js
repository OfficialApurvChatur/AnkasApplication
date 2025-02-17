const mongoose = require('mongoose');
const slugify = require('slugify');
const timezone = require('moment-timezone');
const defaultSchema = require('../../../../../../../../bFunction/jDefaultSchema');

const schema = new mongoose.Schema({
  ...defaultSchema,

  dCards: [{
    title   : { type: String },
    subtitle: { type: String },
    points    : [{
      title   : { type: String },
      subtitle: { type: String },
    }],
  }],

})

// Pre Save
// Slugify Title
schema.pre("save", async function() {
  this.aSlug = slugify(this.aTitle);
})

module.exports = mongoose.model("ExperienceModel", schema)
