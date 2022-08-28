import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostItem } from '../components/PostItem';

import axios from '../utils/axios';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchMyPosts = async () => {
    try {
      const { data } = await axios.get('/posts/user/me');
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
      {posts?.map((post) => (
        <Link to={`/${post._id}`} key={post._id}>
          <PostItem post={post} />
        </Link>
      ))}
    </div>
  );
};

export default MyPosts;
