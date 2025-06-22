import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ messageDetails, isFirstInGroup }) => {
  const messageRef = useRef(null);
  const { userProfile, selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const isSentByMe = messageDetails?.senderId === userProfile?._id;
  const avatarUrl = isSentByMe ? userProfile?.avatar : selectedUser?.avatar;
  const username = isSentByMe ? userProfile?.username : selectedUser?.username;

  return (
    <div ref={messageRef}>
      {messageDetails?.message ? (
        <div className={`chat ${isSentByMe ? "chat-end" : "chat-start"}`}>
          {isFirstInGroup && (
            <>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img alt="User avatar" src={avatarUrl || undefined} />
                </div>
              </div>
              <div className="chat-header">
                {username || "Unknown User"}
                <span className="ml-1">
                  {moment(messageDetails?.createdAt).format("hh:mm A")}
                </span>
              </div>
            </>
          )}

          <div className={`chat-bubble ${isFirstInGroup?"": isSentByMe?"mr-10":"ml-10"}`}>{messageDetails?.message}</div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center text-center py-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="Start conversation"
            className="w-72 h-72 object-contain mb-6 animate-fade-in"
          />
          <h2 className="text-xl font-semibold text-gray-300 mb-2">
            No messages yet
          </h2>
          <p className="text-gray-400">Say hello and start the conversation!</p>
        </div>
      )}
    </div>
  );
};

export default Message;
