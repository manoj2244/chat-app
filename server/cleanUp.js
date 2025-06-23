import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.model.js';
import Message from './models/message.model.js';
import Conversation from './models/conversation.model.js';

dotenv.config();

const clearDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany({});
    await Message.deleteMany({});
    await Conversation.deleteMany({});

    console.log("✅ All data deleted");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error clearing DB:", err);
    process.exit(1);
  }
};

clearDB();
