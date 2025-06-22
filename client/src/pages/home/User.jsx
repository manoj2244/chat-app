import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/user.slice";

const User = (props) => {
  const { userDetails } = props;

  const dispatch = useDispatch();
  console.log(userDetails, "sdgsgsgsdg");
  const { selectedUser } = useSelector((state) => state.user);

    const { onlineUsers } = useSelector((state) => state.socket);
    const filteredOnlineUsers = onlineUsers?.filter(Boolean) || [];


   const isUserOnline = filteredOnlineUsers?.includes(userDetails?._id);
    


  const handleSetUser = () => {
    if (!userDetails) return;
    dispatch(setSelectedUser(userDetails));
  };

  return (
    <div
      onClick={handleSetUser}
      className={` w-full flex gap-5 items-center text-[#cecbcb] cursor-pointer hover:bg-gray-700 rounded-lg py-1 px-2 ${
        selectedUser?._id === userDetails?._id ? "!bg-gray-700" : ""
      }`}
    >
      <div className={`avatar ${isUserOnline && "avatar-online"}`}>
        <div className="w-12 rounded-full">
          <img src={userDetails?.avatar || null} alt="User Avatar" />
        </div>
      </div>
      <div>
        <h2>{userDetails?.fullName}</h2>
        <p className="text-xs">{userDetails?.username}</p>
      </div>
    </div>
  );
};

export default User;
