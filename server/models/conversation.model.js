import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const conversationSchema = new Schema({
  participants: [{
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  messages: [{
    type: Types.ObjectId,
    ref: 'Message',
  }],
}, {
  timestamps: true,
});

const Conversation = model('Conversation', conversationSchema);

export default Conversation;
