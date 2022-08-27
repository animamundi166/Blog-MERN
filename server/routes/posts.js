import { Router } from 'express';
import { createPost, getAll, getById, getMyPosts, getPostComments, removePost, updatePost } from '../controllers/posts.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

router.get('/', getAll);
router.get('/:id', getById);
router.get('/comments/:id', getPostComments);
router.get('/user/me', checkAuth, getMyPosts);
router.post('/', checkAuth, createPost);
router.delete('/:id', checkAuth, updatePost);
router.put('/:id', checkAuth, removePost);

export default router;
