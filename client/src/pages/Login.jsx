import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiUser } from "react-icons/ci";
import { IoIosKey } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUserThunk } from "../store/slice/user/user.thunk";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
    const navigate = useNavigate()
    const {isAuthenticated} = useSelector((state)=>state.user)


  const dispatch = useDispatch();

  const handleInputField = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {

    const response = await dispatch(loginUserThunk(loginData));
      if(response?.payload?.status==="success"){
      navigate("/")
    }
  };
  useEffect(()=>{
    if(isAuthenticated){
      navigate("/")
    }

  },[isAuthenticated])

  return (
    <div className="flex justify-center items-center p-6 w-full h-screen">
      <div className="flex flex-col max-w-[40rem] w-full bg-base-200 gap-6 rounded-lg p-6">
        <h2 className="font-semibold text-2xl">Please login !</h2>
        <label className="input w-full">
          <CiUser />
          <input
            type="text"
            className="grow"
            placeholder="username"
            name="username"
            onChange={handleInputField}
          />
        </label>
        <label className="input w-full">
          <IoIosKey />
          <input
            type="password"
            className="grow"
            placeholder="password"
            name="password"
            onChange={handleInputField}
          />
        </label>
        <button onClick={handleLogin} className="btn btn-primary">
          Login
        </button>
        <p>
          {" "}
          Dont't have an account? &nbsp;
          <Link to={"/sign-up"} className="text-blue-400 underline">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
