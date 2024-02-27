const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  readStatus: {
    type: Boolean,
    default: false
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
