const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  _id: mongoose.Schema.Types.ObjectId // Aggiunta del campo _id
});

module.exports = mongoose.model('User', UserSchema);
