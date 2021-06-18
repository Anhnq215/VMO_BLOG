import { Router } from 'express'

import category from '../admin/category.route';
import tag from '../admin/tag.route'
import user from '../admin/user.route'
import post from '../admin/post.route'

const router = Router();

router.use('/category', category);

router.use('/tag', tag);

router.use('/user', user);

router.use('/post', post);


export default router;