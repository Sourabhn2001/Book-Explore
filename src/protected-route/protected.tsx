// components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const ProtectedRoute = () => {
  // const [isUser, setIsUser] = useState(false)
  const { isLoggedIn } = useSelector((state: any) => state.login);

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("token")
  //   if (isLoggedIn) {
  //     setIsUser(true);
  //   }
  //   console.log("isLoggedIn", isLoggedIn)
  // }, [])

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
