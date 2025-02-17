const mongoose = require('mongoose');
const timezone = require('moment-timezone');

const defaultSchema = {
  aTitle      : { type: String, required: true, unique: true, trim: true },
  aSubtitle   : { type: String, required: true,               trim: true },
  aDescription: { type: String,                               trim: true },
  aDetail     : { type: String,                               trim: true },
  aSlug       : { type: String,                               trim: true },
  aStatus     : { type: Boolean, default: true },
  aImage      : {
    public_id    : { type: String },
    url          : { type: String },
  },  

  bCreatedAt  : { type: Date, default: timezone(Date.now()).tz('Asia/Kolkata') },    
  bUpdatedAt  : { type: Date },  
  bCreatedBy  : { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },    
  bUpdatedBy  : { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },  
};

module.exports = defaultSchema;