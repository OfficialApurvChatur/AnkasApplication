const mongoose = require('mongoose');
const slugify = require('slugify');
const timezone = require('moment-timezone');
const defaultSchema = require('../../../../../../../../bFunction/jDefaultSchema');

const schema = new mongoose.Schema({
  ...defaultSchema,

  dLinks    : [{
    title: { type: String },
    icon : { type: String },
    url  : { type: String },  
  }],
  dReferences: [{
    label: { type: String },
    image: { type: String },
    url  : { type: String },
  }],

})

// Pre Save
// Slugify Title
schema.pre("save", async function() {
  this.aSlug = slugify(this.aTitle);
})

module.exports = mongoose.model("BlogCardModel", schema)
