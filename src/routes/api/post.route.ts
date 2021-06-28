import { Router } from 'express'

const router = Router();
import {getAllPost , getOnePost , postOnePost , updateOnePost, deleteOnePost} from '../../controllers/Post/post.controller'


router.get('/', getAllPost);

router.get('/:id', getOnePost);

router.post('/update/:id', updateOnePost);

router.delete('/delete/:id', deleteOnePost);

router.post('/add', postOnePost);


export default router;

