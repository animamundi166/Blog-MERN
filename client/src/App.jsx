import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import Main from './pages/Main';
import MyPosts from './pages/MyPosts';
import Post from './pages/Post';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getMe } from './redux/auth/authSlice';
import { useEffect } from 'react';
import ProtectedRoutes from './ProtectedRoutes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Main />} />
        <Route path='myposts' element={<MyPosts />} />
        <Route path=':id' element={<Post />} />
        <Route element={<ProtectedRoutes />}>
          <Route path=':id/edit' element={<EditPost />} />
          <Route path='new' element={<AddPost />} />
        </Route>
      </Routes>

      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Layout>
  );
};

export default App;
