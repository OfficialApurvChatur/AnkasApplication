const mongoose = require('mongoose');
const slugify = require('slugify');
const timezone = require('moment-timezone');
const defaultSchema = require('../../../../bFunction/jDefaultSchema');

const schema = new mongoose.Schema({
  ...defaultSchema,

  cMenus: [{
    menu  : { type: mongoose.Schema.Types.ObjectId, ref: 'MenuModel' },
    access: {
      list    : { type: Boolean, default: true },
      create  : { type: Boolean, default: true },
      retrieve: { type: Boolean, default: true },
      update  : { type: Boolean, default: true },
      delete  : { type: Boolean, default: true },
    }
  }],
})

// Pre Save
// Slugify Title
schema.pre("save", async function() {
  this.aSlug = slugify(this.aTitle);
})

module.exports = mongoose.model("RoleModel", schema)