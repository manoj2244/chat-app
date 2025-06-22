import React, { useEffect } from "react";
import UserSidebar from "./UserSidebar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import { initilizeSocket, setOnlineUsers } from "../../store/slice/socket/socket.slice";
import { setNewMessage } from "../../store/slice/message/message.slice";

const Home = (props) => {

  const dispatch= useDispatch()

  const {isAuthenticated,userProfile} =useSelector((state)=>state.user)

  const {socket,onlineUsers} = useSelector((state)=>state.socket)

  console.log(onlineUsers,isAuthenticated,"onlineUsers");
  

  useEffect(()=>{
    if(!isAuthenticated)return;
dispatch(initilizeSocket(userProfile?._id))
  },[isAuthenticated])

  useEffect(()=>{
    if(!socket)return;
       socket.on("onlineUsers",(onlineUsers)=>{
        
        dispatch(setOnlineUsers(onlineUsers))
        
      });

       socket.on("newMessage",(newMessage)=>{
        
        dispatch(setNewMessage(newMessage))

        
        
      });
      return ()=>{
        socket.close()
      }
  },[socket])
  return (
    <div className="flex">
      <UserSidebar/>
      <MessageContainer/>
    </div>
  )
};

export default Home;
