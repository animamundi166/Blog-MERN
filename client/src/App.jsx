import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import Main from './pages/Main';
import Posts from './pages/Posts';
import Post from './pages/Post';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getMe } from './redux/auth/authSlice';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='posts' element={<Posts />} />
        <Route path=':id' element={<Post />} />
        <Route path=':id/edit' element={<EditPost />} />
        <Route path='new' element={<AddPost />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
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
