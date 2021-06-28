import { Router } from 'express'
import { authenticate } from '../../middlewares/auth.middleware';
import { deleteOneTag, getAllTag, getOneTag, updateOneTag, postOneTag } from '../../controllers/Tag/tag.controller';

const router = Router();

router.get('/', authenticate(), getAllTag);

router.get('/:id', getOneTag);

router.post('/update/:id', updateOneTag);

router.delete('/delete/:id', deleteOneTag);

router.post('/add', postOneTag);


export default router;