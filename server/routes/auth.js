import { Router } from 'express';
import { login, register } from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

router.post('/register', register);
router.post('/login', login);
router.post('/me', checkAuth, getMe);

export default router;
