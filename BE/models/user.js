const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  isVerified: { type: Boolean, default: false },
  emailToken: { type: String },
  sendVerify: { type: String },
  basic: {
    name: { type: String, default: null },
    phone: { type: String },
    birthPlace: { type: String },
    birthDate: { type: String },
    gender: { type: Boolean },
    address: { type: String },
  },
  information: {
    education: { type: String },
    occupation: { type: String },
    NPWP: { type: String },
    SLUP: { type: String },
    KTP: { type: String },
  },
  buisness: {
    companyName: { type: String },
    buisnessType: { type: String },
    motherName: { type: String },
    Marital: { type: Boolean },
  },
  finansial: {
    owned1: { type: String },
    properties1: { type: String },
    owned2: { type: String },
    properties2: { type: String },
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
})

module.exports = mongoose.model('user', userSchema)
