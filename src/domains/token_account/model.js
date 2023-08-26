// account.js

const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  publicKey: {
    type: String,
    required: true
  },
  privateKey: {
    type: String,
    required: true
  },
  tokenAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TokenAccount',
    required: true
  },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;

