const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const crypto = require("crypto");
const defaultSchema = require('../../../../bFunction/jDefaultSchema');

const schema = new mongoose.Schema({
  eFirstName: {
    type: String,
    // required: [true, "Please enter first name"],
    max_length: [25, "Name cannot exceed 25 characters"],
    min_length: [5, "Name cannot subceed 5 characters"],
    trim: true
  },
  eLastName: {
    type: String,
    // required: [true, "Please enter last name"],
    max_length: [25, "Name cannot exceed 25 characters"],
    min_length: [5, "Name cannot subceed 5 characters"],
    trim: true
  },
  eEmail: {
    type: String,
    required: [true, "Please enter email"],
    validate: [validator.isEmail, "Please enter valid email"],
    unique: true,
    trim: true
  },
  eMobile: {
    type: String,
  },
  ePassword: {
    type: String,
    required: [true, "Please enter password"],
    max_length: [16, "Name cannot exceed 16 characters"],
    min_length: [8, "Name cannot subceed 8 characters"],
    select: false
  },
  eImage: {
    public_id: { type: String },
    url      : { type: String },
  },
  eResetPasswordToken       : String,
  eResetPasswordTokenExpire : Date,
  eGoogleID: { type: String },

  ...defaultSchema,

  cRole   : { type: mongoose.Schema.Types.ObjectId, ref: 'RoleModel' },

  dAddress: {
    lane    : { type: String },
    street  : { type: String },  
    city    : { type: String },  
    state   : { type: String },  
    country : { type: String },  
    pinCode : { type: String },    
  },
  dLinks  : [{
    title   : { type: String, enum: ['Instagram', 'Twitter', 'Linkedin', 'Portfolio', 'Other'] },
    url     : { type: String },  
  }]

})

// Pre Save
// Slugify Title
schema.pre("save", async function(next) {
  if (!this.isModified("ePassword")) next();
  this.ePassword = await bcryptjs.hash(this.ePassword, 10);

  this.aSlug = slugify(this.aTitle);
})

// Methods
// Compare Password
schema.methods.comparePassword = async function(enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.ePassword)
}

// Get Authentication Token
schema.methods.getAuthenticationToken = function() {
  return jsonwebtoken.sign(
    { id: this._id },
    "SADLKASJDKLASJDKLASJDKLASJDKLADJASKLJDAKSLDJSAKLDjASKLDJCJLFKJLFSLKDPOFOW",
    { expiresIn: "5d"}
  )
}

// Get Reset Password Token
schema.methods.getResetPasswordToken = async function() {
  // Generate Token
  const resetToken = crypto.randomBytes(20).toString("hex")

  // Hash Token
  this.eResetPasswordToken       = crypto.createHash("sha256").update(resetToken).digest("hex")
  this.eResetPasswordTokenExpire = Date.now() + 5*60*1000;

  return resetToken;
}

module.exports = mongoose.model("UserModel", schema)
