import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import User from "./User.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsers,
  getUserProfileThunk,
  logoutUserThunk,
} from "../../store/slice/user/user.thunk.js";

const UserSidebar = () => {

  const [searchValue, setSearchValue] = useState("");

const [users,setUsers] = useState([])  
  const dispatch = useDispatch();
  const { otherUsers,userProfile } = useSelector((state) => state.user);

  const handleLogout = async () => {
     const confirmed = window.confirm("Are you sure you want to logout?");
  if (!confirmed) return;

  
    await dispatch(logoutUserThunk());
  };

  useEffect(() => {
    (async () => {
        dispatch(getOtherUsers())
            dispatch(getUserProfileThunk())

    })();
  }, []);

  useEffect(()=>{
    if(!searchValue){
      setUsers(otherUsers);
    }
   else {
      const lowerSearch = searchValue.toLowerCase();
      const filtered = otherUsers?.filter((user) => {
        return (
          user?.fullName?.toLowerCase().includes(lowerSearch) ||
          user?.username?.toLowerCase().includes(lowerSearch)
        );
      });
      setUsers(filtered);
    }

  },[searchValue,otherUsers])
  console.log(userProfile, "cscxzfsfs");

  return (
    <div className="max-w-[20rem] w-full bg-re h-screen flex flex-col p-3 gap-y-1 border-r border-r-white/10">
      <div className="bg-black p-3 rounded-lg">
        <h2 className="text-[#76E1FF] font-semibold text-xl">Gutar Gu</h2>
      </div>
      <div className="">
        <label className="input">
          <IoIosSearch />
          <input type="search" placeholder="Search" onChange={(e)=>setSearchValue(e.target.value)} />
        </label>
      </div>

      <div className="h-screen overflow-auto flex flex-col gap-y-2">
        {users?.map((userDetails) => {
          return <User key={userDetails?._id} userDetails={userDetails} />;
        })}
      </div>

      <div className="bg-black p-3 rounded-lg flex justify-between items-center">
        {" "}
        <div className="flex justify-center items-center gap-2">

           <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
            <img src={userProfile?.avatar} />
          </div>
        </div>
                <p className="text-sm text-gray-300">{userProfile?.username}</p>

        </div>
       
        <button onClick={handleLogout} className="btn btn-primary btn-sm px-4">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
