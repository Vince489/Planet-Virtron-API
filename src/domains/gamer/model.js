const mongoose = require('mongoose');

const gamerSchema = new mongoose.Schema({
  gamerTag: {
    type: String,
    required: true,
    unique: true,
  },
  email: { 
    type: String, 
    unique: true,
    required: true 
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
  verified: { 
    type: Boolean, 
    default: false 
  }
});

const Gamer = mongoose.model('Gamer', gamerSchema);

module.exports = Gamer;
