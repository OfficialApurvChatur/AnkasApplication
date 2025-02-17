const mongoose = require('mongoose');
const slugify = require('slugify');
const timezone = require('moment-timezone');
const defaultSchema = require('../../../../../../../bFunction/jDefaultSchema');

const schema = new mongoose.Schema({
  ...defaultSchema,

  cPrograms: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'ProgramModel' }
  ],

})

// Pre Save
// Slugify Title
schema.pre("save", async function() {
  this.aSlug = slugify(this.aTitle);
})

module.exports = mongoose.model("ProgramSectionModel", schema)
