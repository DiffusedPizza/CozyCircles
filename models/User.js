const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  accountType: { type: String, enum: ['primaryAcc', 'familyManagerAcc', 'caregiverAcc'] },
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add other user-related fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
