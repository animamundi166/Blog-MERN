import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PopularPosts } from '../components/PopularPosts';
import { PostItem } from '../components/PostItem';
import { getAllPosts } from '../redux/post/postSlice';

const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className='text-xl text-center text-white py-10'>Загрузка...</div>
    );
  }

  return (
    <div className='max-w-[900px] mx-auto py-10'>
      <div className='flex justify-between gap-8'>
        <div className='flex flex-col gap-20 basis-4/5'>
          {posts?.map((post) => (
            <Link to={`/${post._id}`} key={post._id}>
              <PostItem post={post} />
            </Link>
          ))}
        </div>

        <div className='basis-1/5'>
          <div className='text-xs uppercase text-white'>Популярное:</div>

          {popularPosts?.map((post) => (
            <PopularPosts key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
