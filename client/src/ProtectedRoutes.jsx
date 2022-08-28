import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Login from './pages/Login';
import { checkIsAuth } from './redux/auth/authSlice';

const ProtectedRoutes = () => {
  const isAuth = useSelector(checkIsAuth);

  return isAuth ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
