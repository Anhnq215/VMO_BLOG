import { Router } from 'express'

import category from '../api/category.route';
import tag from '../api/tag.route'
import user from '../api/user.route'
import post from '../api/post.route'
import auth from '../api/auth.route'

const router = Router();

router.use('/category', category);

router.use('/tag', tag);

router.use('/user', user);

router.use('/post', post);

router.use('/auth', auth);


export default router;