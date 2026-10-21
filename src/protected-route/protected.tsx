// components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state: any) => state.login);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
