import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';
import AppError from '../utilities/error.utility.js';
import catchAsync from '../utilities/aync.utility.js';
import { getIO, getSocketId } from '../socket/socket.js';


export const createMessage = catchAsync(async (req, res, next) => {
  const senderId = req.userId; 
  const receiverId = req.params.receiverId;
  
  const {  message } = req.body;

  if (!receiverId || !message) {
    return next(new AppError('Receiver ID and message are required', 400));
  }

  // 1. Check if conversation exists (between sender & receiver)
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId], $size: 2 },
  });

  // 2. If not, create one
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  // 3. Create message
  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
  });

  // 4. Push message into conversation
  conversation.messages.push(newMessage._id);
  await conversation.save();


  // socket.io

  const socketId = getSocketId(receiverId)


getIO().to(socketId).emit("newMessage", newMessage); 
  res.status(201).json({
    status: 'success',
    message: 'Message sent successfully',
    data: newMessage,
  });
});

export const getMessage = catchAsync(async (req, res, next) => {
  const myId = req.userId; 
  const otherParticipantId = req.params.otherParticipantId;
  

  if (!myId || !otherParticipantId) {
    return next(new AppError('All fields are required', 400));
  }

  // 1. Check if conversation exists (between sender & receiver)
  let conversation = await Conversation.findOne({
    participants: { $all: [myId, otherParticipantId] },
  }).populate("messages");






  res.status(201).json({
    status: 'success',
    data: conversation,
  });
});