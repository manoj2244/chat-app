import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";

const SendMessages = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    await dispatch(
      sendMessageThunk({ receiverId: selectedUser?._id, message: message })
    );

    setMessage("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && message.trim()) {
      handleMessage();
    }
  };

  return (
    <div className="p-3 w-full flex justify-center items-center gap-2">
      <input
        onKeyDown={handleKeyDown}
        value={message}
        type="text"
        placeholder="Type here ..."
        className="input w-full border border-gray-500 focus:border-blue-300 focus:outline-none focus:ring-0 focus:ring-blue-100"
        onChange={(e) => handleChangeMessage(e)}
      />
      <button
        disabled={!message.trim()}
        onClick={handleMessage}
        className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition duration-300 shadow-md"
        title="Send"
      >
        <IoIosSend size={18} />
      </button>
    </div>
  );
};

export default SendMessages;
