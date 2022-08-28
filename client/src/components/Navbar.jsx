import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkIsAuth, logout } from '../redux/auth/authSlice';

const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast('Вы вышли из системы');
    navigate('/');
  };

  const activeStyles = {
    color: 'white',
  };

  return (
    <div className='flex py-6 justify-between items-center'>
      <span className='flex justify-center items-center text-xl text-white rounded-sm'>
        <NavLink
          to={'/'}
          className='text-xl text-gray-400 hover:text-white'
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
        >
          Blog
        </NavLink>
      </span>

      {isAuth && (
        <ul className='flex gap-8'>
          <li>
            <NavLink
              to={'/myposts'}
              className='text-xs text-gray-400 hover:text-white'
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Мои посты
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/new'}
              className='text-xs text-gray-400 hover:text-white'
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Добавить пост
            </NavLink>
          </li>
        </ul>
      )}

      <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
        {isAuth ? (
          <button onClick={logoutHandler}>Выйти</button>
        ) : (
          <Link to={'/login'}> Войти </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
