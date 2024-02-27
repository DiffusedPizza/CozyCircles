const mongoose = require('mongoose');

const userConversationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  }
});

const UserConversation = mongoose.model('UserConversation', userConversationSchema);

module.exports = UserConversation;
