import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const messageSchema = new Schema({
  senderId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

const Message = model('Message', messageSchema);

export default Message;
