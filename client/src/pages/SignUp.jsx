import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoIosKey } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserThunk } from "../store/slice/user/user.thunk";
import toast from "react-hot-toast";

const SignUp = () => {
  const [signUp, setSignUpData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender:"male"
  });
  const navigate = useNavigate()
const { isAuthenticated, screenLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch()
  const handleInputField = (e) => {
    setSignUpData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = async()=>{
    if(signUp.password!==signUp.confirmpassword){
      return toast.error("Password and confirm password not match !!")
    }
    const response = await dispatch(registerUserThunk(signUp))

    
    if(response?.payload?.status==="success"){
      navigate("/login")
    }
  }


// useEffect(() => {
//   if (!screenLoading && isAuthenticated) {
//     navigate("/");
//   }
// }, [screenLoading, isAuthenticated]);

//   if (!screenLoading) {
//   return (
//     <div className="h-screen w-full flex justify-center items-center">
//       <span className="loading loading-spinner text-primary"></span>
//     </div>
//   );
// }

  return (
    <div className="flex justify-center items-center p-6 w-full h-screen">
      <div className="flex flex-col max-w-[40rem] w-full bg-base-200 gap-6 rounded-lg p-6">
        <h2 className="font-semibold text-2xl">Please SignUp!</h2>
        <label className="input w-full">
          <CiUser />
          <input
            type="text"
            className="grow"
            placeholder="Full Name"
            onChange={handleInputField}
            name="fullName"
          />
        </label>
        <label className="input w-full">
          <CiUser />
          <input
            type="text"
            className="grow"
            placeholder="Username"
            onChange={handleInputField}
            name="username"
          />
        </label>
        <label className="input w-full">
          <IoIosKey />
          <input
            type="password"
            className="grow"
            placeholder="Password"
            onChange={handleInputField}
            name="password"
          />
        </label>
        <label className="input w-full">
          <IoIosKey />
          <input
            type="password"
            className="grow"
            placeholder="Confirm Password"
            onChange={handleInputField}
            name="confirmpassword"
          />
        </label>
        <div className="flex gap-3">
          <label className="label cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="male"
              className="radio checked:bg-blue-500"
              checked={signUp.gender==="male"}
            onChange={handleInputField}
            />
                  <span className="label-text ml-2">Male</span>

          </label>
          <label className="label cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="female"
              className="radio checked:bg-pink-500"
            onChange={handleInputField}
            />
                  <span className="label-text ml-2">Female</span>

          </label>
        </div>
        <button onClick={handleSignUp} className="btn btn-primary">SignUp</button>
        <p>
          {" "}
          Already have an account? &nbsp;
          <Link to={"/login"} className="text-blue-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
