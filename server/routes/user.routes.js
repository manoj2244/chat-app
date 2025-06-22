import express from "express";
import { getOtherUsers, getProfile, login, logout, register } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
const routers = express.Router();

routers.post('/login',login)
routers.post('/register',register);
routers.get('/get-profile',protect,getProfile)
routers.get('/get-other-users',getOtherUsers)

routers.post('/logout',logout)




export default routers;