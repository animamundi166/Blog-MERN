import { useCallback, useEffect, useState } from 'react';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CommentItem } from '../components/CommentItem';
import { createComment, getPostComments } from '../redux/comment/commentSlice';
import { removePost } from '../redux/post/postSlice';
import { toast } from 'react-toastify';
import axios from '../utils/axios';
import { PostItem } from '../components/PostItem';

const Post = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id));
      toast('Пост был удален');
      navigate('/posts');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    try {
      const postId = params.id;
      dispatch(createComment({ postId, comment }));
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [params.id, dispatch]);

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!post) {
    return (
      <div className='text-xl text-center text-white py-10'>Загрузка...</div>
    );
  }

  return (
    <>
      <button className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
        <Link className='flex' to={'/'}>
          Назад
        </Link>
      </button>

      <div className='flex gap-10 py-8'>
        <div className='w-2/3'>
          <PostItem key={post._id} post={post} />

          {user?._id === post.author && (
            <div className='flex gap-3 mt-4'>
              <button className='flex items-center justify-center gap-2 text-white opacity-50'>
                <Link to={`/${params.id}/edit`}>
                  <AiTwotoneEdit />
                </Link>
              </button>
              <button
                onClick={removePostHandler}
                className='flex items-center justify-center gap-2  text-white opacity-50'
              >
                <AiFillDelete />
              </button>
            </div>
          )}
        </div>

        <div className='w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm'>
          <form className='flex gap-2' onSubmit={(e) => e.preventDefault()}>
            <input
              type='text'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Comment'
              className='text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700'
            />
            <button
              type='submit'
              onClick={handleSubmit}
              className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
            >
              Отправить
            </button>
          </form>

          {comments?.map((cmt) => (
            <CommentItem key={cmt._id} cmt={cmt} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Post;
