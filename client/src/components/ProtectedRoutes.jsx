import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({children}) => {
  const state = useSelector((state)=>state.user)
  const navigate = useNavigate()
  console.log(state?.isAuthenticated,state?.screenLoading,"fsdgsdgsdgsdg");

  useEffect(()=>{
    if(!state?.isAuthenticated && !state?.screenLoading){
      navigate("/login")
    }
  },[state?.isAuthenticated,state?.screenLoading])
  
  return children;
};

export default ProtectedRoutes;
