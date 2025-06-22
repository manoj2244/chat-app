import express from 'express';
import { createMessage, getMessage } from '../controllers/message.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/send/:receiverId', protect, createMessage); 
router.get('/get-message/:otherParticipantId', protect, getMessage); 


export default router;
