import React, { useEffect } from "react";
import User from "./User";
import { IoIosSend, IoMdCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import SendMessages from "./SendMessages";

const MessageContainer = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(messages, "dsfdsfgds");
    if (!selectedUser?._id) return;
    dispatch(getMessageThunk(selectedUser?._id));
  }, [selectedUser]);

  return (
    <>
      {selectedUser ? (
        <div className="w-full h-screen flex flex-col">
          {/* Header */}
          <div className="border-b border-b-white/10 p-3 flex justify-between items-center gap-5">
            <User userDetails={selectedUser} />
            <div className="flex justify-between gap-x-5 items-center text-[24px]">
              <FaVideo />
              <IoMdCall />
              <BsThreeDotsVertical />
            </div>
          </div>

          {/* Message Area */}
          <div className="p-3 flex-1 overflow-auto">
            {messages?.length > 0 ? (
              messages.map((msg, index) => (
                <Message key={index} messageDetails={msg} isFirstInGroup={index === 0 || messages[index - 1].senderId !== msg.senderId}
/>
              ))
            ) : (
              <Message />
            )}
          </div>

          {/* Input Area */}
         <SendMessages/>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/start-chat-4489183-3722787.png"
            alt="Start chat"
            className="w-72 h-72 object-contain mb-6 animate-fade-in"
          />
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">
            No chat selected
          </h2>
          <p className="text-gray-400">
            Select a user from the sidebar to start a conversation.
          </p>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
