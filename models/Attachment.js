const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  }
});

const Attachment = mongoose.model('Attachment', attachmentSchema);

module.exports = Attachment;

