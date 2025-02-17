const mongoose = require('mongoose');
const slugify = require('slugify');
const timezone = require('moment-timezone');
const defaultSchema = require('../../../../../../../../bFunction/jDefaultSchema');

const schema = new mongoose.Schema({
  ...defaultSchema,

  dLinks  : [{
    title   : { type: String, enum: ['Instagram', 'Twitter', 'Linkedin', 'Portfolio', 'Other'] },
    url     : { type: String },  
  }],
  dIcon: {
    label: { type: String },
    value  : { type: String },  
  },

})

// Pre Save
// Slugify Title
schema.pre("save", async function() {
  this.aSlug = slugify(this.aTitle);
})

module.exports = mongoose.model("ServiceModel", schema)
